import React, { useEffect } from "react";
import "./TemperaturePerDay.css";
import clearSky from "../../assets/images/icons/clear-sky.svg";
import fewClouds from "../../assets/images/icons/few-clouds.svg";
import scatteredClouds from "../../assets/images/icons/scattered-clouds.svg";
import brokenClouds from "../../assets/images/icons/broken-clouds.svg";
import drizzle from "../../assets/images/icons/drizzle.svg";
import showerRain from "../../assets/images/icons/shower-rain.svg";
import rain from "../../assets/images/icons/rain.svg";
import thunderstorm from "../../assets/images/icons/thunderstorm.svg";
import snow from "../../assets/images/icons/snow.svg";
import mist from "../../assets/images/icons/mist.svg";

const TemperaturePerDay = ({ dailyWeather }) => {
  useEffect(() => {
    /* console.log("TemperaturePerDay");
    console.log(dailyWeather); */
  }, [dailyWeather]);

  const renderSwitch = (weatherDescription) => {
    switch (weatherDescription) {
      case "clear sky":
        return clearSky;
      case "few clouds":
        return fewClouds;
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
        return rain;
      case "light rain":
        return rain;
      case "thunderstorm":
        return thunderstorm;
      case "snow":
        return snow;
      case "mist":
        return mist;
      default:
        return "Icône introuvable";
    }
  };
  return (
    <div className="TPDContainer">
      <p className="daysPrevisionsTitle">Prévisions sur 5 jours</p>
      {dailyWeather.map((day, index) => (
        <div className={"TPD " + (index === 0 ? "firstTPD" : "")} key={index}>
          <span className="TPDDay">{day.dayName.substring(0, 3)}.</span>
          <div className="TPDIconAndTemp">
            <img className="TPDIcon" src={renderSwitch(day.weather.description)} alt="Sunny icon" />
            <span className="TPDTemperature">{Math.round(day.temp.min)}°</span>
            <div className="TPDProgressBar"></div>
            <span className="TPDTemperature">{Math.round(day.temp.max)}°</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemperaturePerDay;
