import React, { useState, useEffect } from 'react';
import './styles/Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const city = 'Nagpur';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.REACT_APP_WEATHER_API_KEY}`);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <div className="weather">Loading...</div>;
  }

  if (!weatherData) {
    return <div className="weather">Error fetching weather data</div>;
  }

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const iconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  return (
    <div className="weather">
      <span>{weatherData.name}</span>
      <img src={iconUrl} alt="Weather Icon" />
      <span>{temperature}°C</span>
      <div className="weather-modal">
        <table>
          <tbody>
            <tr>
              <td><strong>City:</strong></td>
              <td>{weatherData.name}</td>
            </tr>
            <tr>
              <td><strong>Temperature:</strong></td>
              <td>{temperature}°C</td>
            </tr>
            <tr>
              <td><strong>Humidity:</strong></td>
              <td>{weatherData.main.humidity}%</td>
            </tr>
            <tr>
              <td><strong>Wind Speed:</strong></td>
              <td>{weatherData.wind.speed} km/h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Weather;
