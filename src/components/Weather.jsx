import React, { useState } from 'react';
import axios from 'axios';
 

const API_KEY = '6571d543a8e83027c55ddb7b1f1616af'; 

const  Weather= () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    getWeatherData();
  };

  return (
    <div className="container">
      <h1 className="title">React Weather App</h1>
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;