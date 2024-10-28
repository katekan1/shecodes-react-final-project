import React from "react";

const CurrentWeather = ({ data, onToggleUnit, unit }) => {
  // Function to convert temperature based on unit
  const getTemperature = (temp) => {
    return unit === "metric"
      ? Math.round(temp)
      : Math.round((temp * 9) / 5 + 32);
  };

  return (
    <div className="CurrentWeather">
      <h2>
        {data.city}{" "}
        <img
          src={
            data.condition.icon_url ||
            "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
          }
          alt={data.condition.description}
          style={{
            width: "30px",
            height: "30px",
            verticalAlign: "middle",
            marginLeft: "8px",
          }}
        />
      </h2>
      <div>
        <span>{getTemperature(data.temperature.current)}°</span>
        <button onClick={onToggleUnit}>
          {unit === "metric" ? "Show in °F" : "Show in °C"}
        </button>
      </div>
      <p>{new Date(data.time * 1000).toLocaleString()}</p>
      <div className="weather-info">
        <p>Condition: {data.condition.description}</p>
        <p>Humidity: {data.temperature.humidity}%</p>
        <p>Wind: {Math.round(data.wind.speed)} km/h</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
