import React from "react";
import WeatherSearch from "./components/WeatherSearch.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />
      <main className="app-main">
        <WeatherSearch />
      </main>
      <footer className="app-footer">
        <p>Powered by OpenWeatherMap · Built with React + Axios</p>
      </footer>
    </div>
  );
}

export default App;
