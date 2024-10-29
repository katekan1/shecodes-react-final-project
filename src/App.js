import React, { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Johannesburg");
  const apiKey = "802c9c10be5f7cact2abba03f4270ao2";

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const weatherResponse = await fetch(
          `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`
        );
        const forecastResponse = await fetch(
          `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`
        );

        if (!weatherResponse.ok || !forecastResponse.ok)
          throw new Error("Network response was not ok");

        const weather = await weatherResponse.json();
        const forecast = await forecastResponse.json();

        setWeatherData(weather);
        setForecastData(forecast.daily.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
        setWeatherData(null);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [unit, city]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newCity = e.target.elements.city.value;
    setCity(newCity || "Johannesburg");
  };

  return (
    <div className="WeatherApp">
      {" "}
      <div className="SearchBar">
        <form onSubmit={handleSearch}>
          <input type="text" name="city" placeholder="Search City" />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : weatherData ? (
        <>
          <CurrentWeather
            data={weatherData}
            toggleUnit={toggleUnit}
            unit={unit}
          />
          <div className="Forecast">
            {forecastData && forecastData.length > 0 ? (
              <div className="forecast-grid">
                {forecastData.map((dayData, index) => (
                  <div key={index} className="forecast-day">
                    <div>
                      {new Date(dayData.time * 1000).toLocaleDateString(
                        "en-US",
                        { weekday: "short" }
                      )}
                    </div>
                    <img src={dayData.condition.icon_url} alt="weather icon" />
                    <div>
                      {Math.round(dayData.temperature.minimum)}° /{" "}
                      {Math.round(dayData.temperature.maximum)}°
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No forecast data available.</div>
            )}
          </div>
        </>
      ) : (
        <div>No data available.</div>
      )}
      <footer>
        <p>
          This Project is coded by Katekani Shihundla and is open-sourced on
          <a
            href="https://github.com/katekan1/shecodes-react-final-project"
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
