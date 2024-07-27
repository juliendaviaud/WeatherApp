import React, { useEffect, useState } from "react";
import "./MainPage.css";
import WeatherInformations from "../WeatherInformations/WeatherInformations";
import Menu from "../Menu/Menu";
import { fetchWeather, fetchHourlyWeather, fetchDailyWeather } from "../api";


const MainPage = () => {
  const [city, setCity] = useState("Montpellier");
  const [weather, setWeather] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [cities, setCities] = useState([
    { name: "Montpellier", weather: null },
  ]);
  const [actualWeatherId, setActualWeatherId] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    fetchData();
    /* console.log(weather); */
    /* console.log(weather.weather[0].description); */
    /* selectBackground(weather.weather[0].description); */
  }, [city]);

  const fetchData = async () => {
    const data = await fetchWeather(city);
    setWeather(data);
    setSunrise(data.sys.sunrise);
    setSunset(data.sys.sunset);
    const hourlyWeather = await fetchHourlyWeather(city);
    setHourlyWeather(hourlyWeather);
    const dailyWeather = await fetchDailyWeather(city);
    setDailyWeather(dailyWeather);
    setActualWeatherId(data.weather[0].id);
    setBackgroundImage(
      selectBackground(
        data.weather[0].id,
        isNight(data.dt, data.sys.sunrise, data.sys.sunset)
      )
    );
    console.log(
      selectBackground(
        data.weather[0].id,
        isNight(data.dt, data.sys.sunrise, data.sys.sunset)
      )
    );
    console.log(data.weather[0].id);
    console.log(data.dt);
    console.log(data.sys.sunrise);
    console.log(data.sys.sunset);
  };

  const selectBackground = (weatherId, isNight) => {
    switch (weatherId) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return "thunderstorm";
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return "drizzle";
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        if (isNight) {
          return "sleety-night";
        } else {
          return "rain";
        }
      case 511:
        return "snow";
      case 520:
      case 521:
      case 522:
      case 531:
        return "shower-rain";
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 621:
        return "snow";
      case 701:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
      case 761:
      case 762:
      case 771:
      case 781:
        return "mist";
      case 800:
        if (isNight) {
          return "clean-night";
        } else {
          return "clear-sky";
        }
      case 801:
        if (isNight) {
          return "partly-cloudy-night";
        } else {
          return "few-clouds";
        }
      case 802:
        return "scattered-clouds";
      case 803:
      case 804:
        return "broken-clouds";
      default:
        return "Fond introuvable";
    }
  };

  const isNight = (hourTimestamp, sunriseTimestamp, sunsetTimestamp) => {
    var hour = new Date(hourTimestamp * 1000);
    var sunrise = new Date(sunriseTimestamp * 1000);
    var sunset = new Date(sunsetTimestamp * 1000);
    hour = hour.toLocaleTimeString();
    sunrise = sunrise.toLocaleTimeString();
    sunset = sunset.toLocaleTimeString();
    return hour < sunrise || hour > sunset;
  };

  const addCity = (newCity) => {
    setCities([...cities, { name: newCity, weather: null }]);
  };

  return (
    <div
      className="mainPage"
      /* style={{
        backgroundImage: "url(../../assets/icons/" + backgroundImage + ".svg)",
      }} */
    >
      <div className="appContainer">
        {/* <Menu cities={cities} setCity={setCity} addCity={addCity}/> */}
        <WeatherInformations
          weather={weather}
          hourlyWeather={hourlyWeather}
          dailyWeather={dailyWeather}
          coord={weather?.coord}
          sunrise={sunrise}
          sunset={sunset}
          isNight={isNight}
        />
      </div>
    </div>
  );
};

export default MainPage;
