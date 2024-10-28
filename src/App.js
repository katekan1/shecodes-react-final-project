import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css"; // Ensure you have the CSS file imported
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState("metric"); // "metric" for Celsius, "imperial" for Fahrenheit
  const apiKey = "802c9c10be5f7cact2abba03f4270ao2"; // Your SheCodes API key
  const defaultCity = "Johannesburg";

  const fetchWeatherData = useCallback(
    (city) => {
      const weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
      const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;

      axios
        .get(weatherUrl)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching current weather data:", error);
        });

      axios
        .get(forecastUrl)
        .then((response) => {
          setForecastData(response.data.daily);
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
        });
    },
    [unit]
  );

  useEffect(() => {
    fetchWeatherData(defaultCity); // Fetch weather for the default city on initial load
  }, [fetchWeatherData]);

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const handleSearch = (city) => {
    fetchWeatherData(city);
  };

  return (
    <div className="WeatherApp">
      <SearchBar onSearch={handleSearch} />
      <CurrentWeather
        data={weatherData}
        unit={unit}
        onUnitChange={handleUnitChange}
      />
      <Forecast data={forecastData} />
      <footer>
        <p>
          This Project is coded by Katekani Shihundla and it is open-sourced on
          <a
            href="https://github.com/katekani1/weather-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          and hosted on
          <a
            href="https://shecodes-reactapp-final-project.netlify.app/"
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

export default App;
