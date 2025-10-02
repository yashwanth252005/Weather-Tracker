import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import ToastContainer from "./components/ToastContainer";
import WeatherLoader from "./components/WeatherLoader";
import WeatherSidebar from "./components/WeatherSidebar";
import { useEffect, useState } from "react";
import useToast from "./hooks/useToast";
import "./App.css";
import "../src/index.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function App({ theme, setTheme }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedWeather, setSelectedWeather] = useState(null);
    const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } = useToast();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // ---------- API HELPERS ----------
    async function getWeatherByCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        return await response.json();
    }

    async function getWeatherByZip(zip) {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Invalid Zip Code");
        return await response.json();
    }

    async function getWeatherByCoords(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Invalid coordinates");
        return await response.json();
    }

    // ---------- FETCH USER LOCATION ----------
    async function fetchUserLocationWeather() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        try {
                            const data = await getWeatherByCoords(
                                pos.coords.latitude,
                                pos.coords.longitude
                            );
                            resolve(data);
                        } catch (err) {
                            reject(err);
                        }
                    },
                    async (err) => {
                        console.warn("High-accuracy geolocation failed:", err);

                        // fallback: fetch by IP-based location
                        try {
                            const res = await fetch("https://ipapi.co/json/");
                            const loc = await res.json();
                            if (loc && loc.latitude && loc.longitude) {
                                const data = await getWeatherByCoords(
                                    loc.latitude,
                                    loc.longitude
                                );
                                resolve(data);
                            } else {
                                reject(new Error("IP-based location failed"));
                            }
                        } catch (e) {
                            reject(e);
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0,
                    }
                );
            } else {
                reject(new Error("Geolocation not supported"));
            }
        });
    }

    // ---------- LOAD CARDS ON MOUNT ----------
    useEffect(() => {
        const saved = localStorage.getItem("weatherCards");
        let parsed = saved ? JSON.parse(saved) : [];

        setLoading(true);

        fetchUserLocationWeather()
            .then((weather) => {
                const exists = parsed.some((w) => w.id === weather.id);
                if (!exists) {
                    parsed = [weather, ...parsed];
                    showSuccess(`Weather loaded for your location: ${weather.name}`, 4000);
                } else {
                    showInfo(`Weather for your location (${weather.name}) is already displayed.`, 4000);
                }
                setCards(parsed);
            })
            .catch((err) => {
                console.error("Location error:", err);
                showWarning("Unable to fetch your location. Please search manually.", 5000);
                setCards(parsed);
            })
            .finally(() => setLoading(false));
    }, []);

    // ---------- SAVE TO LOCAL STORAGE ----------
    useEffect(() => {
        if (cards.length > 0) {
            localStorage.setItem("weatherCards", JSON.stringify(cards));
        }
    }, [cards]);

    // ---------- SEARCH HANDLER ----------
    const handleSearch = async (data) => {
        // Show loading message
        const searchTerm = data.type === "coords" ? `${data.lat}, ${data.lon}` : data.value;
        showInfo(`Searching weather for ${searchTerm}...`, 2000);

        try {
            let weather;
            if (data.type === "city") {
                weather = await getWeatherByCity(data.value);
            } else if (data.type === "zip") {
                weather = await getWeatherByZip(data.value);
            } else if (data.type === "coords") {
                weather = await getWeatherByCoords(data.lat, data.lon);
            }

            if (weather) {
                // Check if city already exists in cards
                const exists = cards.some((w) => w.id === weather.id);
                if (!exists) {
                    setCards((prev) => [...prev, weather]);
                    showSuccess(`Weather added for ${weather.name}`, 3000);
                } else {
                    showWarning(`Weather for ${weather.name} is already displayed.`, 4000);
                }
            }
        } catch (err) {
            console.error("Search error:", err);
            showError("Could not find weather for your search. Please check the spelling and try again.", 5000);
        }
    };

    // ---------- FORECAST ----------
    async function getForecastByCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        const grouped = {};
        data.list.forEach((item) => {
            const date = new Date(item.dt_txt);
            const day = date.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
            });

            if (!grouped[day]) grouped[day] = [];
            grouped[day].push(item);
        });

        const days = Object.keys(grouped).slice(0, 3);

        const forecast3Days = days.map((day) => {
            const entries = grouped[day];
            const temps = entries.map((e) => e.main.temp);
            const descriptions = entries.map((e) => e.weather[0].description);

            const desc =
                descriptions.sort(
                    (a, b) =>
                        descriptions.filter((v) => v === a).length -
                        descriptions.filter((v) => v === b).length
                ).pop() || descriptions[0];

            return {
                day,
                min: Math.min(...temps).toFixed(1),
                max: Math.max(...temps).toFixed(1),
                desc,
                icon: entries[0].weather[0].icon,
            };
        });

        return forecast3Days;
    }

    const handleForecast = async (cityName) => {
        try {
            const forecast = await getForecastByCity(cityName);
            showInfo(`3-day forecast loaded for ${cityName}`, 3000);
            return forecast;
        } catch (err) {
            console.error("Forecast error:", err);
            showError(`Unable to load forecast for ${cityName}. Please try again.`, 4000);
            throw err;
        }
    };

    // Handle more info button click to open sidebar
    const handleMoreInfo = (weather) => {
        setSelectedWeather(weather);
        setSidebarOpen(true);
        showInfo(`Detailed view opened for ${weather.name}`, 2000);
    };

    // Handle sidebar close
    const handleSidebarClose = () => {
        setSidebarOpen(false);
        setSelectedWeather(null);
    };

    return (
        <div id="app" className="app">
            <div className="form-div">
                <div className="form-container">
                    <WeatherForm onSearch={handleSearch} />
                </div>
            </div>

            {loading && (
                <WeatherLoader message="Fetching your location..." />
            )}

            <div>
                <div className="card-container">
                    {cards.map((weather) => (
                        <WeatherCard
                            key={weather.id || weather.name}
                            weather={weather}
                            onMoreInfo={handleMoreInfo}
                            onDelete={(idOrName) => {
                                const cardToDelete = cards.find(w => (w.id || w.name) === idOrName);
                                const updated = cards.filter(
                                    (w) => (w.id || w.name) !== idOrName
                                );
                                setCards(updated);
                                localStorage.setItem("weatherCards", JSON.stringify(updated));
                                showInfo(`Weather card for ${cardToDelete?.name || 'location'} removed`, 3000);
                                // Close sidebar if deleted card was selected
                                if (selectedWeather && (selectedWeather.id || selectedWeather.name) === idOrName) {
                                    handleSidebarClose();
                                }
                            }}
                            onForecast={handleForecast}
                        />
                    ))}
                </div>
            </div>
            <WeatherSidebar
                isOpen={sidebarOpen}
                onClose={handleSidebarClose}
                weather={selectedWeather}
            />
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
}

export default App;
