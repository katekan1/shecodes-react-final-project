import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import "./App.css"; // Import your CSS file

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const apiKey = "802c9c10be5f7cact2abba03f4270ao2"; // Your SheCodes API key

  // Function to fetch weather data for a specific city
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

  // Function to toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  // useEffect to fetch weather data for Johannesburg when the app loads
  useEffect(() => {
    fetchWeatherData("Johannesburg"); // Set default city to Johannesburg
  }, []); // Empty dependency array means this runs once when the component mounts

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
    </div>
  );
};

export default WeatherApp;
