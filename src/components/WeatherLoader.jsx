import React from 'react';
import './WeatherLoader.css';

const WeatherLoader = ({ message = "Fetching your location..." }) => {
    return (
        <div className="weather-loader-container">
            <div className="weather-loader">
                {/* Cloud with rain animation */}
                <div className="cloud">
                    <div className="cloud-part cloud-part-1"></div>
                    <div className="cloud-part cloud-part-2"></div>
                    <div className="cloud-part cloud-part-3"></div>
                    <div className="cloud-part cloud-part-4"></div>
                </div>

                {/* Animated raindrops */}
                <div className="rain">
                    <div className="raindrop raindrop-1"></div>
                    <div className="raindrop raindrop-2"></div>
                    <div className="raindrop raindrop-3"></div>
                    <div className="raindrop raindrop-4"></div>
                    <div className="raindrop raindrop-5"></div>
                </div>

                {/* Sun peeking from behind */}
                <div className="sun">
                    <div className="sun-ray sun-ray-1"></div>
                    <div className="sun-ray sun-ray-2"></div>
                    <div className="sun-ray sun-ray-3"></div>
                    <div className="sun-ray sun-ray-4"></div>
                </div>
            </div>

            <div className="loader-text">
                <span className="location-icon">📍</span>
                <span className="loading-message">{message}</span>
                <div className="loading-dots">
                    <span className="dot dot-1">.</span>
                    <span className="dot dot-2">.</span>
                    <span className="dot dot-3">.</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherLoader;