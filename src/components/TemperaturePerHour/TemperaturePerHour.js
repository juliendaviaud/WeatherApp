import React, { useEffect, useState } from "react";
import "./TemperaturePerHour.css";
import clearSky from "../../assets/images/icons/clear-sky.svg";
import cleanNight from "../../assets/images/icons/clean-night.svg";
import fewClouds from "../../assets/images/icons/few-clouds.svg";
import partlyCloudyNight from "../../assets/images/icons/partly-cloudy-night.svg";
import scatteredClouds from "../../assets/images/icons/scattered-clouds.svg";
import brokenClouds from "../../assets/images/icons/broken-clouds.svg";
import drizzle from "../../assets/images/icons/drizzle.svg";
import showerRain from "../../assets/images/icons/shower-rain.svg";
import rain from "../../assets/images/icons/rain.svg";
import sleetyNight from "../../assets/images/icons/sleety-night.svg";
import thunderstorm from "../../assets/images/icons/thunderstorm.svg";
import snow from "../../assets/images/icons/snow.svg";
import mist from "../../assets/images/icons/mist.svg";

const TemperaturePerHour = ({ hourlyWeather, sunrise, sunset, isNight }) => {
  const renderSwitch = (weatherDescription, isNight) => {
    switch (weatherDescription) {
      case "clear sky":
        if (isNight) {
          return cleanNight;
        } else {
          return clearSky;
        }
      case "few clouds":
        if (isNight) {
          return partlyCloudyNight;
        } else {
          return fewClouds;
        }
      case "scattered clouds":
        return scatteredClouds;
      case "broken clouds":
        return brokenClouds;
      case "overcast clouds":
        return brokenClouds;
      case "drizzle":
        return drizzle;
      case "shower rain":
        return showerRain;
      case "rain":
        if (isNight) {
          return sleetyNight;
        } else {
          return rain;
        }
      case "light rain":
        return rain;
      case "thunderstorm":
        return thunderstorm;
      case "snow":
        return snow;
      case "mist":
        return mist;
      default:
        return "foo";
    }
  };

  return (
    <div className="TPHContainer">
      <p className="hourPrevisionsTitle">Prévisions toutes les 3h</p>
      <div className="TPHLine">
        {hourlyWeather.map((hour, index) => (
          <div className={"TPH " + (index === 0 ? "firstTPH" : "")} key={index}>
            {index === 0 ? (
              <span className="TPHHour">Maint.</span>
            ) : (
              <span className="TPHHour">
                {0 <= new Date(hour.dt * 1000).getHours() - 2 &&
                new Date(hour.dt * 1000).getHours() - 2 < 10
                  ? "0"
                  : ""}
                {new Date(hour.dt * 1000).getHours() - 2}h
              </span>
            )}

            <img
              src={renderSwitch(
                hour.weather[0].description,
                isNight(hour.dt, sunrise, sunset)
              )}
              alt="Sunny icon"
            />

            <span className="TPHTemperature">
              {Math.round(hour.main.temp)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemperaturePerHour;
