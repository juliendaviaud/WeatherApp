import React from "react";
import "./DetailedInformations.css";
import TemperaturePerHour from "../TemperaturePerHour/TemperaturePerHour";
import TemperaturePerDay from "../TemperaturePerDay/TemperaturePerDay";
import PrecipitationMap from "../PrecipitationMap/PrecipitationMap";

const DetailedInformations = ({ hourlyWeather, dailyWeather, coord, sunrise, sunset, isNight }) => {
  return (
    <div className="detailedInformations">
      <TemperaturePerHour hourlyWeather={hourlyWeather} sunrise={sunrise} sunset={sunset} isNight={isNight}/>
      <div className="TPHAndMap">
        <TemperaturePerDay dailyWeather={dailyWeather}/>
        <PrecipitationMap coord={coord} />
      </div>
    </div>
  );
};

export default DetailedInformations;
