

'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'
import {
    FaTemperatureHigh,

    FaWind,
    FaSun,
    FaCloud,
    FaTint,
    FaArrowDown,
    FaArrowUp,
} from 'react-icons/fa';
import { TbWorldLongitude, TbWorldLatitude, TbFileTime } from 'react-icons/tb';
import { MdVisibility } from 'react-icons/md';
import { VscRepoForcePush } from 'react-icons/vsc';
import Loader from './loading';

const WeatherComponent = ({ cityname }) => {
    
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = process.env.API_KEY || 'bf21c1956ecfaaf21e2d269d7eadbe7b';
    // console.log(apiKey);
    
    useEffect(() => {
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;

        axios
            .get(apiUrl)
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }, [cityname]);

    if (!weatherData) {
        return <Loader/>;
    }

    const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

    const getWindDirection = (degrees) => {
        const directions = ['North', 'NorthEast', 'East', 'SouthEast', 'South', 'SouthWest', 'West', 'NorthWest'];
        const index = Math.round((degrees % 360) / 45);
        return directions[index % 8];
    };

    const formatTimezone = (timezone) => {
        const hours = Math.floor(timezone / 3600);
        const minutes = Math.floor((timezone % 3600) / 60);
        const sign = hours >= 0 ? '+' : '-';
        return `${sign}${Math.abs(hours)}:${minutes}`;
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row"> {/* Use flex-col for mobile and flex-row for larger screens */}
                <div className="md:w-1/2 pr-4 mb-4 md:mb-0"> {/* Use md:w-1/2 for larger screens */}
                    <h2 className="text-xl font-semibold mb-1">
                        Weather in {weatherData.name}, {weatherData.sys.country} {new Date(weatherData.dt * 1000).toLocaleString()}
                    </h2>
                    <div className="flex justify-center items-center mb-6">
                        <img
                            style={{ height: '30%', width: '40%' }}
                            className="w-28 h-28 mr-4"
                            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                            alt="Weather Icon"
                        />
                        <p className="text-lg font-semibold">{weatherData.weather[0].description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaTemperatureHigh className="text-blue-500 text-4xl" />
                        <p className="text-lg ">
                            Temperature: <span className='text-blue-700 font-bold'>{weatherData.main.temp}°C</span>
                            <br />
                            <span className=" text-gray-800">
                                Min: {weatherData.main.temp_min}°C <FaArrowDown className="inline text-xs" />
                            </span>
                            <span className="ml-4 text-gray-800">
                                Max: {weatherData.main.temp_max}°C <FaArrowUp className="inline text-xs" />
                            </span>
                        </p>
                    </div>
                </div>
                <div className="md:w-1/2"> 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
                    <div className="flex items-center space-x-2">
                            <FaTemperatureHigh className="text-green-500 text-4xl" />
                            <p>feels_like: {weatherData.main.feels_like} °C</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaWind className="text-green-500 text-4xl" />
                            <p>
                                Wind Speed: {weatherData.wind.speed} m/s, <br />
                                Direction: {getWindDirection(weatherData.wind.deg)}

                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <FaTint className="text-blue-500 text-4xl" />
                            <p>Humidity: {weatherData.main.humidity}%</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MdVisibility className="text-gray-500 text-4xl" />
                            <p>Visibility: {weatherData.visibility / 1000} km</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <VscRepoForcePush className="text-gray-500 text-4xl" />
                            <p>Pressure: {weatherData.main.pressure} hPa</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCloud className="text-gray-500 text-4xl" />
                            <p>Cloudiness: {weatherData.clouds.all}%</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaSun className="text-yellow-500 text-4xl" />
                            <p>Sunrise: {sunriseTime}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaSun className="text-orange-500 text-4xl" />
                            <p>Sunset: {sunsetTime}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <TbWorldLatitude className="text-yellow-500 text-4xl" />
                            <p>Latitude: {weatherData.coord.lat}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <TbWorldLongitude className="text-orange-500 text-4xl" />
                            <p>Longitude: {weatherData.coord.lon}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <TbFileTime className="text-orange-500 text-4xl" />
                            <p>Timezone: UTC{formatTimezone(weatherData.timezone)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaTint className="text-blue-500 text-4xl" />
                            <p>Sea Level: {weatherData.main.sea_level} hPa</p>
                            <p>Ground Level: {weatherData.main.grnd_level} hPa</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherComponent;

// https://api.weatherapi.com/v1/current.json?key=7f66b15ac9b946548d7174656220402&q=Gandhinagar