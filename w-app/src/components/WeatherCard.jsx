import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ data }) => {
  const {
    name,
    sys,
    main,
    weather,
    wind,
    visibility,
    dt,
  } = data;

  const date = new Date(dt * 1000);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const getWindDirection = (deg) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <article className="weather-card">
      <header className="card-header">
        <div className="location-info">
          <h2 className="city-name">
            {name}
            <span className="country-badge">{sys.country}</span>
          </h2>
          <p className="date-time">
            <span>{formattedDate}</span>
            <span className="time-sep">·</span>
            <span>{formattedTime}</span>
          </p>
        </div>
        <div className="condition-block">
          <img src={iconUrl} alt={weather[0].description} className="weather-icon" />
          <span className="condition-text">{weather[0].description}</span>
        </div>
      </header>

      <div className="temp-display">
        <span className="temp-main">{Math.round(main.temp)}</span>
        <span className="temp-unit">°C</span>
        <div className="feels-like">
          Feels like <strong>{Math.round(main.feels_like)}°C</strong>
        </div>
      </div>

      <div className="temp-range">
        <span className="temp-high">↑ {Math.round(main.temp_max)}°</span>
        <span className="temp-divider">/</span>
        <span className="temp-low">↓ {Math.round(main.temp_min)}°</span>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-icon">💧</span>
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{main.humidity}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌬️</span>
          <span className="stat-label">Wind</span>
          <span className="stat-value">
            {(wind.speed * 3.6).toFixed(1)} km/h {getWindDirection(wind.deg)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">👁️</span>
          <span className="stat-label">Visibility</span>
          <span className="stat-value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌡️</span>
          <span className="stat-label">Pressure</span>
          <span className="stat-value">{main.pressure} hPa</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌅</span>
          <span className="stat-label">Sunrise</span>
          <span className="stat-value">
            {new Date(sys.sunrise * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌇</span>
          <span className="stat-label">Sunset</span>
          <span className="stat-value">
            {new Date(sys.sunset * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
