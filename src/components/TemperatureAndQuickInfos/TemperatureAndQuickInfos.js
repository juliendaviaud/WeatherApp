import React, { useEffect } from "react";
import "./TemperatureAndQuickInfos.css";
import arrow from "../../assets/images/icons/arrow.svg";

const TemperatureAndQuickInfos = ({ weather }) => {
  return (
    <div className="TemperatureAndQuickInfosContainer">
      <p className="city">{weather.name}</p>
      <div className="temperature">
        <p className="temperatureNumber">{Math.round(weather.main.temp)}</p>
        <p className="degreeSign">°</p>
      </div>
      <p className="weather">{weather.weather[0].description}</p>
      <div className="higherAndLowerTemperature">
        <div className="higherTemperature">
          <img src={arrow} alt="Flèche vers le haut" />
          <p>{Math.round(weather.main.temp_max)}</p>
        </div>
        <div className="lowerTemperature">
          <img src={arrow} alt="Flèche vers le bas" />
          <p>{Math.round(weather.main.temp_min)}</p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureAndQuickInfos;
