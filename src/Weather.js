import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      city: response.data.name,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function search() {
    const apiKey = "3323f2e20324d1953472069851a88a5a";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();

    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="container">
      <div className="weather-app-wrapper">
        <form id="search-form" className="mb-2" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-7">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                id="city-input"
                autocomplete="off"
              />

              <div className="col-3" id="button">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-secondary w-55"
                  onChange={handleCityChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <h1>{weatherData.city}</h1>

      <img src={weatherData.imgLink} className="weather-img" alt="icon" />

      <h2>
        <span className="temperature">{weatherData.temperature}</span>
        <span className="units">
          <button href="#">°C</button> | <button href="#">°F</button>
        </span>
      </h2>

      <h3>
        <li>{weatherData.description}</li>
      </h3>
      <ul>
        <li id="date">
          {weatherData.currentDay} {weatherData.currentHour}
        </li>
      </ul>

      <div className={weatherData.weatherForecast}></div>

      <div className="row row-cols">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Wind: <span>{weatherData.wind}</span>
                <br />
                Humidity: <span>{weatherData.humidity}</span>
                <br />
              </h5>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Sunrise: <span>{weatherData.sunrise}</span>
                <br />
                Sunset: <span>{weatherData.sunset}</span>
                <br />
              </h5>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
