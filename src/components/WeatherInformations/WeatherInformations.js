import React from 'react'
import "./WeatherInformations.css"
import TemperatureAndQuickInfos from '../TemperatureAndQuickInfos/TemperatureAndQuickInfos'
import DetailedInformations from '../DetailedInformations/DetailedInformations'

const WeatherInformations = ({ weather, hourlyWeather, dailyWeather, coord, sunrise, sunset, isNight }) => {
  return (
	<div className='weatherInformations'>
		{ weather && <TemperatureAndQuickInfos weather={weather}/>}
		{ hourlyWeather && dailyWeather && coord && sunrise && sunset && isNight && <DetailedInformations hourlyWeather={hourlyWeather} dailyWeather={dailyWeather} coord={coord} sunrise={sunrise} sunset={sunset} isNight={isNight}/>}
	</div>
  )
}

export default WeatherInformations