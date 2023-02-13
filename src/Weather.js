import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./App.css";
import "./Weather.css";
import "./WeatherInfo";
import WeatherIcon from "./WeatherIcon";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";
import DateUtil from "./FormattedDate";
import Api from "./Api";
import Forecast from "./Forecast";
import "bootstrap/dist/css/bootstrap.css";

export default class Weather extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
  };

  state = {
    city: this.props.city,
  };

  componentWillMount() {
    this.refresh(this.state.city);
  }

  refreshWeatherFromParams(params) {
    let url = `${Api.url}/data/2.5/weather?appid=${Api.key}&units=metric&${params}`;
    axios.get(url).then((response) => {
      this.setState({
        city: response.data.name,
        weather: {
          ready: true,
          city: response.data.name,
          date: new Date(response.data.dt * 1000),
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          humidity: Math.round(response.data.main.humidity) + "%",
          temperature: Math.round(response.data.main.temp),
          time: new DateUtil(new Date(response.data.dt * 1000)).dayTime(),
          wind: Math.round(response.data.wind.speed) + "km/h",
          iconUrl:
            "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
        },
      });
    });
  }

  refreshWeatherFromLatitudeAndLongitude = (latitude, longitude) => {
    this.refreshWeatherFromParams(`lat=${latitude}&lon=${longitude}`);
  };

  refresh = (city) => {
    this.refreshWeatherFromParams(`q=${city}`);
  };

  render() {
    if (this.state.weather) {
      return (
        <div>
          <div className="clearfix">
            <Search refresh={this.refresh} />
            <CurrentLocation
              refresh={this.refreshWeatherFromLatitudeAndLongitude}
            />
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="clearfix">
                <div className="float-left weather-icon">
                  <WeatherIcon iconName={this.state.weather.icon} />
                </div>
                <div className="weather-temp weather-temp--today">
                  {this.state.weather.temperature}
                </div>
                <div className="weather-unit__text weather-unit__text--today">
                  °C
                </div>
              </div>
            </div>
          </div>
          <div className="weather-summary">
            <div className="weather-summary-header">
              <h1>{this.state.city}</h1>
              <div className="weather-detail__text">
                {this.state.weather.time}
              </div>
              <div className="weather-detail__text">
                {this.state.weather.description}
              </div>
            </div>

            <div className="row row-cols">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="weather-detail__text">
                      Humidity: {this.state.weather.humidity}
                    </div>
                    <div className="weather-detail__text">
                      Wind: {this.state.weather.wind}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="weather-detail__text">
                      Sunrise: {this.state.weather.sunrise}
                    </div>
                    <div className="weather-detail__text">
                      Sunset: {this.state.weather.sunset}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Forecast city={this.state.city} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          App is loading, <em>please wait...</em>
        </div>
      );
    }
  }
}
