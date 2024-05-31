// // Weather.js
// import React, { useState, useEffect } from 'react';


// const Weather = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [showModal, setShowModal] = useState(true);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY');
//         setWeatherData(response.data);
//       } catch (error) {
//         console.error('Error fetching weather:', error);
//       }
//     };

//     fetchWeather();
//   }, []);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   if (!weatherData) {
//     return <div>Loading...</div>;
//   }

//   const { name } = weatherData;
//   const temperature = Math.round(weatherData.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
//   const iconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

//   return (
//     <div className="weather" onClick={toggleModal}>
//       <span>{name}</span>
//       <img src={iconUrl} alt="Weather Icon" />
//       <span>{temperature}°C</span>
//       {showModal && (
//         <div className="weather-modal">
//           <h3>{name}</h3>
//           <p>Temperature: {temperature}°C</p>
//           {/* Add additional weather info here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;
// Weather.js
// Weather.js
// Weather.js
// import React, { useState, useRef, useEffect } from 'react';
// import './styles/Weather.css';

// const Weather = () => {
//   const [showModal, setShowModal] = useState(false);
//   const weatherRef = useRef(null);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (weatherRef.current && !weatherRef.current.contains(event.target)) {
//         setShowModal(false);
//       }
//     };

//     const handleClick = (event) => {
//       handleOutsideClick(event);
//     };

//     document.addEventListener('mousedown', handleClick);

//     return () => {
//       document.removeEventListener('mousedown', handleClick);
//     };
//   }, []);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div className="weather" ref={weatherRef} onClick={toggleModal}>
//       <span>City Name</span>
//       {/* <img className="weather-icon" src="https://via.placeholder.com/50" alt="Weather Icon" /> */}
//       <span>25°C</span>
//       {showModal && (
//         <div className="weather-modal">
//           <div className="weather-card">
//             <h3>City Name</h3>
//             <p>Temperature: 25°C</p>
//             <p>Humidity: 70%</p>
//             <p>Wind Speed: 10 km/h</p>
//             {/* Add additional weather info here */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;
import React, { useState, useEffect } from 'react';
import './styles/Weather.css';


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const apiKey = '94e445d71cd3d32644626192b905af31';
  const city = 'Nagpur'; 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey, city]);

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