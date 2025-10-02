import React, { useState, useRef, useCallback, useEffect } from 'react';
import './WeatherSidebar.css';

const WeatherSidebar = ({ isOpen, onClose, weather }) => {
    const [sidebarWidth, setSidebarWidth] = useState(400);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

    // Handle mouse resize
    const startResizing = useCallback((mouseDownEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent) => {
            if (isResizing) {
                const newWidth = mouseMoveEvent.clientX;
                if (newWidth >= 300 && newWidth <= 600) {
                    setSidebarWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    // Generate weather tips based on conditions
    const getWeatherTips = (weather) => {
        if (!weather) return [];

        const tips = [];
        const temp = weather.main.temp;
        const condition = weather.weather[0].main.toLowerCase();
        const humidity = weather.main.humidity;
        const windSpeed = weather.wind?.speed || 0;
        const visibility = weather.visibility || 10000;

        // Temperature-based tips
        if (temp > 35) {
            tips.push({
                icon: "🔥",
                type: "warning",
                title: "Heat Alert!",
                message: "Stay hydrated, wear light colors, and avoid prolonged sun exposure."
            });
        } else if (temp > 25) {
            tips.push({
                icon: "☀️",
                type: "info",
                title: "Warm Weather",
                message: "Perfect weather for outdoor activities. Don't forget sunscreen!"
            });
        } else if (temp < 0) {
            tips.push({
                icon: "🥶",
                type: "warning",
                title: "Freezing Cold",
                message: "Bundle up! Wear layers, gloves, and cover exposed skin."
            });
        } else if (temp < 10) {
            tips.push({
                icon: "🧥",
                type: "info",
                title: "Cold Weather",
                message: "Wear a warm jacket and consider bringing a scarf."
            });
        }

        // Weather condition tips
        if (condition.includes('rain') || condition.includes('drizzle')) {
            tips.push({
                icon: "☔",
                type: "warning",
                title: "Rainy Day",
                message: "Take an umbrella and wear waterproof shoes."
            });
        } else if (condition.includes('snow')) {
            tips.push({
                icon: "❄️",
                type: "warning",
                title: "Snowy Conditions",
                message: "Drive carefully, wear non-slip shoes, and dress warmly."
            });
        } else if (condition.includes('storm') || condition.includes('thunder')) {
            tips.push({
                icon: "⛈️",
                type: "danger",
                title: "Thunderstorm Alert",
                message: "Stay indoors, avoid open areas, and postpone outdoor activities."
            });
        } else if (condition.includes('fog') || condition.includes('mist')) {
            tips.push({
                icon: "🌫️",
                type: "warning",
                title: "Low Visibility",
                message: "Drive slowly, use headlights, and be extra cautious."
            });
        }

        // Humidity tips
        if (humidity > 80) {
            tips.push({
                icon: "💧",
                type: "info",
                title: "High Humidity",
                message: "It may feel warmer than it is. Choose breathable fabrics."
            });
        }

        // Wind tips
        if (windSpeed > 10) {
            tips.push({
                icon: "💨",
                type: "warning",
                title: "Windy Conditions",
                message: "Secure loose items and be careful with umbrellas."
            });
        }

        // Cloudiness tips
        if (weather.clouds?.all >= 80) {
            tips.push({
                icon: "☁️",
                type: "info",
                title: "Very Cloudy",
                message: "Overcast skies expected. Great for outdoor activities without harsh sun!"
            });
        } else if (weather.clouds?.all >= 50) {
            tips.push({
                icon: "⛅",
                type: "info",
                title: "Partly Cloudy",
                message: "Mixed sun and clouds. Perfect for most outdoor activities."
            });
        }

        // Moderate temperature tips
        if (temp >= 15 && temp <= 20 && !condition.includes('rain') && !condition.includes('snow')) {
            tips.push({
                icon: "🌤️",
                type: "success",
                title: "Pleasant Weather",
                message: "Comfortable temperature for walking, cycling, or outdoor dining!"
            });
        }

        // UV and sun protection tips
        if (condition.includes('clear') || weather.clouds?.all < 30) {
            tips.push({
                icon: "🕶️",
                type: "warning",
                title: "Sun Protection",
                message: "Clear skies ahead! Don't forget sunglasses and sunscreen."
            });
        }

        // Clear weather tips
        if (condition.includes('clear') && temp >= 15 && temp <= 25) {
            tips.push({
                icon: "🌟",
                type: "success",
                title: "Perfect Weather",
                message: "Great day for outdoor activities, picnics, or a walk!"
            });
        }

        // General comfort tips based on temperature ranges
        if (temp >= 10 && temp <= 15) {
            tips.push({
                icon: "🧥",
                type: "info",
                title: "Cool but Comfortable",
                message: "Light jacket recommended. Perfect for brisk walks or jogging."
            });
        }

        // Evening/night temperature tips
        const currentHour = new Date().getHours();
        if (currentHour >= 18 || currentHour <= 6) {
            if (temp < 15) {
                tips.push({
                    icon: "🌙",
                    type: "info",
                    title: "Cool Evening",
                    message: "Temperature drops in the evening. Consider bringing an extra layer."
                });
            }
        }

        // Activity suggestions based on conditions
        if (!condition.includes('rain') && !condition.includes('storm') && temp >= 12 && temp <= 25) {
            tips.push({
                icon: "🚶",
                type: "success",
                title: "Great for Walking",
                message: "Good conditions for outdoor exercise and fresh air activities."
            });
        }

        // Default tip if no specific conditions are met
        if (tips.length === 0) {
            tips.push({
                icon: "🌍",
                type: "info",
                title: "Weather Update",
                message: "Stay informed about changing weather conditions throughout the day."
            });
        }

        return tips;
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getWindDirection = (degrees) => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    };

    if (!isOpen) return null;

    const tips = getWeatherTips(weather);

    return (
        <>
            <div className="sidebar-overlay" onClick={onClose}></div>
            <div
                ref={sidebarRef}
                className="weather-sidebar"
                style={{ width: `${sidebarWidth}px` }}
            >
                <div className="sidebar-header">
                    <div className="location-info">
                        <h2>{weather?.name}, {weather?.sys?.country}
                        </h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="sidebar-content">
                    {/* Main Weather Info */}
                    <div className="weather-overview">
                        <div className="current-weather">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt={weather?.weather[0]?.description}
                                className="weather-icon-large"
                            />
                            <div className="temp-info">
                                <span className="temperature">{Math.round(weather?.main?.temp)}°C</span>
                                <span className="feels-like">Feels like {Math.round(weather?.main?.feels_like)}°C</span>
                                <span className="description">{weather?.weather[0]?.description}</span>
                            </div>
                        </div>
                    </div>

                    {/* Weather Details Grid */}
                    <div className="weather-details">
                        <div className="detail-card">
                            <div className="detail-icon">🌡️</div>
                            <div className="detail-info">
                                <span className="detail-label">Min / Max</span>
                                <span className="detail-value">
                                    {Math.round(weather?.main?.temp_min)}° / {Math.round(weather?.main?.temp_max)}°
                                </span>
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-icon">💧</div>
                            <div className="detail-info">
                                <span className="detail-label">Humidity</span>
                                <span className="detail-value">{weather?.main?.humidity}%</span>
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-icon">👁️</div>
                            <div className="detail-info">
                                <span className="detail-label">Visibility</span>
                                <span className="detail-value">{(weather?.visibility / 1000).toFixed(1)} km</span>
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-icon">🌬️</div>
                            <div className="detail-info">
                                <span className="detail-label">Wind</span>
                                <span className="detail-value">
                                    {weather?.wind?.speed} m/s {getWindDirection(weather?.wind?.deg)}
                                </span>
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-icon">📊</div>
                            <div className="detail-info">
                                <span className="detail-label">Pressure</span>
                                <span className="detail-value">{weather?.main?.pressure} hPa</span>
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-icon">☁️</div>
                            <div className="detail-info">
                                <span className="detail-label">Cloudiness</span>
                                <span className="detail-value">{weather?.clouds?.all}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Sun Times */}
                    <div className="sun-times">
                        <div className="sun-time">
                            <div className="sun-icon">🌅</div>
                            <div className="sun-info">
                                <span className="sun-label">Sunrise</span>
                                <span className="sun-value">{formatTime(weather?.sys?.sunrise)}</span>
                            </div>
                        </div>
                        <div className="sun-time">
                            <div className="sun-icon">🌇</div>
                            <div className="sun-info">
                                <span className="sun-label">Sunset</span>
                                <span className="sun-value">{formatTime(weather?.sys?.sunset)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Weather Tips */}
                    <div className="weather-tips">
                        <h3>Smart Tips</h3>
                        <div className="tips-container">
                            {tips.map((tip, index) => (
                                <div key={index} className={`tip-card tip-${tip.type}`}>
                                    <div className="tip-icon">{tip.icon}</div>
                                    <div className="tip-content">
                                        <h4 className="tip-title">{tip.title}</h4>
                                        <p className="tip-message">{tip.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Resize Handle */}
                <div
                    className="resize-handle"
                    onMouseDown={startResizing}
                ></div>
            </div>
        </>
    );
};

export default WeatherSidebar;