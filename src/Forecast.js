import React from "react";

const Forecast = ({ data, unit }) => {
  // Function to convert temperature based on unit
  const getTemperature = (temp) => {
    return unit === "metric"
      ? Math.round(temp)
      : Math.round((temp * 9) / 5 + 32);
  };

  return (
    <div className="Forecast">
      <div className="forecast-grid">
        {data.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-day">
            <p>
              {new Date(day.time * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={
                day.condition.icon_url ||
                "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
              }
              alt={day.condition.description}
            />
            <p>
              {getTemperature(day.temperature.minimum)}° /{" "}
              {getTemperature(day.temperature.maximum)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
