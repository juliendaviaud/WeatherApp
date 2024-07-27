// src/api.js
import axios from 'axios';

const API_KEY = 'db11a7b8a33990f9be0b55167b129989';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
        lang:'fr',
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchHourlyWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        exclude: 'current,minutely,daily,alerts',
        units: 'metric',
        appid: API_KEY
      }
    });

    // Récupérer l'heure actuelle
    const now = new Date();
    // Calculer l'heure dans 27 heures
    const extraHour = new Date(now.getTime() + 27 * 60 * 60 * 1000);

    // Filtrer les données pour ne garder que celles des prochaines 27 heures
    const next27HoursData = response.data.list.filter(item => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate >= now && itemDate <= extraHour;
    });
    /* console.log(next27HoursData); */
    return next27HoursData;
  } catch (error) {
    throw error;
  }
};

/* export const fetchDailyWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        exclude: 'current,minutely,hourly,alerts',
        units: 'metric',
        appid: API_KEY
      }
    });

    // Traitement des données pour obtenir des prévisions quotidiennes
    const dailyData = processDailyData(response.data.list);
    console.log(dailyData)
    return dailyData;
  } catch (error) {
    throw error;
  }
};

const processDailyData = (data) => {
  const daily = {};

  data.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toISOString().split('T')[0]; // yyyy-mm-dd

    if (!daily[dateString]) {
      daily[dateString] = {
        temp: [],
        weather: [],
        humidity: [],
        wind_speed: [],
        // Ajouter d'autres paramètres si nécessaire
      };
    }

    daily[dateString].temp.push(item.main.temp);
    daily[dateString].weather.push(item.weather[0]);
    daily[dateString].humidity.push(item.main.humidity);
    daily[dateString].wind_speed.push(item.wind.speed);
  });

  const dailyWeather = Object.keys(daily).map((date) => {
    const dayData = daily[date];

    return {
      date,
      temp: {
        min: Math.min(...dayData.temp),
        max: Math.max(...dayData.temp),
        average: (dayData.temp.reduce((a, b) => a + b, 0) / dayData.temp.length).toFixed(1),
      },
      weather: dayData.weather[0], // Prendre la première prévision météo (vous pouvez améliorer cela)
      humidity: {
        average: (dayData.humidity.reduce((a, b) => a + b, 0) / dayData.humidity.length).toFixed(1),
      },
      wind_speed: {
        average: (dayData.wind_speed.reduce((a, b) => a + b, 0) / dayData.wind_speed.length).toFixed(1),
      },
      // Ajouter d'autres paramètres si nécessaire
    };
  });

  return dailyWeather;
}; */

const getDayNameInFrench = (date) => {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return days[date.getUTCDay()];
};

export const fetchDailyWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY
      }
    });

    // Filtrer les données pour exclure la journée d'aujourd'hui
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const filteredData = response.data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toISOString().split('T')[0];
      return dateString !== today;
    });

    // Traitement des données pour obtenir des prévisions quotidiennes
    const dailyData = processDailyData(filteredData);
    return dailyData;
  } catch (error) {
    throw error;
  }
};

const processDailyData = (data) => {
  const daily = {};

  data.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toISOString().split('T')[0]; // yyyy-mm-dd

    if (!daily[dateString]) {
      daily[dateString] = {
        temp: [],
        weather: [],
        humidity: [],
        wind_speed: [],
        // Ajouter d'autres paramètres si nécessaire
      };
    }

    daily[dateString].temp.push(item.main.temp);
    daily[dateString].weather.push(item.weather[0]);
    daily[dateString].humidity.push(item.main.humidity);
    daily[dateString].wind_speed.push(item.wind.speed);
  });

  const dailyWeather = Object.keys(daily).map((date) => {
    const dayData = daily[date];
    const dateObject = new Date(date);

    return {
      date,
      dayName: getDayNameInFrench(dateObject),
      temp: {
        min: Math.min(...dayData.temp),
        max: Math.max(...dayData.temp),
        average: (dayData.temp.reduce((a, b) => a + b, 0) / dayData.temp.length).toFixed(1),
      },
      weather: dayData.weather[0], // Prendre la première prévision météo (vous pouvez améliorer cela)
      humidity: {
        average: (dayData.humidity.reduce((a, b) => a + b, 0) / dayData.humidity.length).toFixed(1),
      },
      wind_speed: {
        average: (dayData.wind_speed.reduce((a, b) => a + b, 0) / dayData.wind_speed.length).toFixed(1),
      },
      // Ajouter d'autres paramètres si nécessaire
    };
  });

  return dailyWeather;
};

export const fetchOpenStreetMap = () => {
  return `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
};

export const fetchPrecipitationMap = (lat, lon, zoom) => {
  return `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`;
};

/* const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}?city=${city}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Paris`);
  console.log(response.data);
  return response.data;
};

export const fetchHourlyWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}?city=${city}&hourly=temperature_2m,weathercode&timezone=Europe/Paris`);
  return response.data;
};

export const fetchDailyWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}?city=${city}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Paris`);
  return response.data;
};

export const fetchPrecipitationMap = (lat, lon, zoom) => {
  return `https://maps.open-meteo.com/?layer=precipitation&lat=${lat}&lon=${lon}&zoom=${zoom}`;
}; */