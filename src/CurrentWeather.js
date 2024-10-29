import React, { useState, useEffect } from "react";

const CurrentWeather = ({ data, toggleUnit, unit }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString()); // Adjust format as needed
    };

    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  if (!data) return null;

  const { city, condition, temperature, wind, humidity } = data;

  return (
    <div className="CurrentWeather">
      <h1>{city}</h1>
      {condition.icon_url && (
        <img src={condition.icon_url} alt="Weather icon" />
      )}

      <div className="weather-info">
        <p>
          Temperature: {temperature.current}°{unit === "metric" ? "C" : "F"}
        </p>
        <p>Current Time: {currentTime}</p>
        <p>Condition: {condition.description}</p>
        <p>Humidity: {humidity}%</p>
        <p>
          Wind Speed: {wind.speed} {unit === "metric" ? "km/h" : "mph"}
        </p>
      </div>
      <button onClick={toggleUnit}>
        Change to {unit === "metric" ? "°F" : "°C"}
      </button>
    </div>
  );
};

export default CurrentWeather;
