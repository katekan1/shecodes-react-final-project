<div className="Forecast">
  {forecastData && forecastData.length > 0 ? (
    <div className="forecast-grid">
      {forecastData.map((dayData, index) => (
        <div key={index} className="forecast-day">
          <div>
            {new Date(dayData.time * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </div>

          <img
            src={`https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${dayData.icon}.png`}
            alt="weather icon"
          />
          <div>
            {dayData.minimum}° / {dayData.maximum}°
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>No forecast data available.</div>
  )}
</div>;
