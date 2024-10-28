import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import "./App.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const apiKey = "802c9c10be5f7cact2abba03f4270ao2";

  const fetchWeatherData = (city) => {
    const weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;

    axios.get(weatherUrl).then((response) => {
      setWeatherData(response.data);
    });

    axios.get(forecastUrl).then((response) => {
      setForecastData(response.data.daily);
    });
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  useEffect(() => {
    fetchWeatherData("Johannesburg");
  }, []);
  return (
    <div className="WeatherApp">
      <SearchBar onSearch={fetchWeatherData} />
      {weatherData && (
        <>
          <CurrentWeather
            data={weatherData}
            onToggleUnit={toggleUnit}
            unit={unit}
          />
          {forecastData && <Forecast data={forecastData} unit={unit} />}
        </>
      )}
      <footer>
        <p>
          This Project is coded by Katekani Shihundla and it is open-sourced on{" "}
          <a
            href="https://github.com/katekan1/shecodes-react-final-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://shecodes-react-git.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default WeatherApp;
