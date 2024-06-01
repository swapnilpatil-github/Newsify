
import React, { useState, useEffect, useRef } from 'react';
import './styles/Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState('Nagpur');
  const [inputCity, setInputCity] = useState('');
  const modalRef = useRef(null);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.REACT_APP_WEATHER_API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCityChange = () => {
    if (inputCity.trim() !== '') {
      setCity(inputCity);
      
      setShowModal(false);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  if (loading) {
    return <div className="weather">Loading...</div>;
  }

  if (!weatherData) {
    return <div className="weather">Error fetching weather data</div>;
  }

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  return (
    <div
      className="weather"
      onClick={toggleModal}
    >
      <span>{weatherData.name}</span>
      <img src={iconUrl} alt="Weather Icon" />
      <span>{temperature}°C</span>
      <div
        className={`weather-modal ${showModal ? 'show' : ''}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onClick={(e) => e.stopPropagation()} // Prevent closing the modal on input click
        />
        <button onClick={(e) => { e.stopPropagation(); handleCityChange(); }}>Search</button>
        <table>
          <tbody>
            <tr>
              <td>City:</td>
              <td>{weatherData.name}</td>
            </tr>
            <tr>
              <td>Temperature:</td>
              <td>{temperature}°C</td>
            </tr>
            <tr>
              <td>Humidity:</td>
              <td>{weatherData.main.humidity}%</td>
            </tr>
            <tr>
              <td>Wind Speed:</td>
              <td>{weatherData.wind.speed} km/h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Weather;
