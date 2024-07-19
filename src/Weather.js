import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [isLoading, setIsLoading] = useState(false);

  function handleResponse(response) {
    setIsLoading(false);
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    setIsLoading(true);
    const apiKey = "eac360db5fc86ft86450f3693e73o43f";
    let apiUrl = `https://api.openweathermap.org/data/3.0/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
    setIsLoading(false);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <h1>Current Weather</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9 ">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3 p-0">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast
          coordinates={weatherData.coordinates}
          city={weatherData.city}
        />
        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/Carooh55"
            target="_blank"
            rel="noopener noreferrer"
          >
            Makhadzi
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/Carooh55/weatherapp-carooh"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://669428fa2fc3dbab528a04d0--reactapp-weatherc.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    search();
    if (isLoading) {
      return null;
    }
  }
}
