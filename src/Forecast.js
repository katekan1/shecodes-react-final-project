import React from "react";

const Forecast = ({ data }) => {
  return (
    <div className="Forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {data.map((day, index) => (
          <div className="forecast-day" key={index}>
            <p>{new Date(day.time * 1000).toLocaleDateString()}</p>
            <img
              src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}`}
              alt={day.condition.description}
            />
            <div className="temperature">
              <span className="min-temperature">
                {Math.round(day.temperature.minimum)}°
              </span>
              /
              <span className="max-temperature">
                {Math.round(day.temperature.maximum)}°
              </span>
            </div>
            <p>{day.condition.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
