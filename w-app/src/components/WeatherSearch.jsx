import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "./WeatherSearch.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(
        `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError(`City "${cityName}" not found. Please check the spelling and try again.`);
        } else if (err.response.status === 401) {
          setError("Invalid API key. Please configure a valid OpenWeatherMap API key.");
        } else {
          setError(`Error ${err.response.status}: ${err.response.data?.message || "Something went wrong."}`);
        }
      } else if (err.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather(city);
  };

  const suggestions = ["London", "Tokyo", "New York", "Paris", "Chennai", "Sydney"];

  return (
    <section className="weather-search">
      <div className="search-header">
        <div className="logo-mark">⛅</div>
        <h1 className="app-title">Skycaster</h1>
        <p className="app-tagline">Real-time weather for anywhere on Earth</p>
      </div>

      <form className="search-form" onSubmit={handleSubmit} role="search">
        <div className="input-group">
          <span className="search-prefix-icon">🔍</span>
          <input
            type="text"
            className="city-input"
            placeholder="Search a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="City name"
            autoComplete="off"
          />
          <button
            type="submit"
            className="search-btn"
            disabled={loading}
            aria-label="Search weather"
          >
            {loading ? <span className="spinner" /> : "Search"}
          </button>
        </div>
      </form>

      {!weatherData && !loading && !error && (
        <div className="suggestions">
          <p className="suggestions-label">Try a city:</p>
          <div className="suggestion-chips">
            {suggestions.map((s) => (
              <button
                key={s}
                className="chip"
                onClick={() => {
                  setCity(s);
                  fetchWeather(s);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-state" aria-live="polite">
          <div className="pulse-ring" />
          <p>Fetching weather data…</p>
        </div>
      )}

      {error && (
        <div className="error-banner" role="alert">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {weatherData && <WeatherCard data={weatherData} />}
    </section>
  );
};

export default WeatherSearch;
