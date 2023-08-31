'use client'
import React, { useState, useEffect, useRef } from 'react';
import WeatherData from '../components/WeatherData';

const App = () => {
  const [cityname, setCityname] = useState('New Delhi');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef();

  const handleCityChange = (event) => {
    setCityname(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setCityname(suggestion.name);
    setSuggestions([]);
  };

  useEffect(() => {
    if (cityname !== "") {
      fetch(`https://api.weatherapi.com/v1/search.json?key=7b4950a630544d9caf8145337233108&q=${cityname}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data);
        })
        .catch(error => {
          console.log("Error fetching location suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [cityname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="mb-4 flex items-center space-x-2">
        <label htmlFor="cityInput" className="block font-medium w-32 md:w-36">
          Enter City Name:
        </label>
        <input
          type="text"
          id="cityInput"
          value={cityname}
          onChange={handleCityChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions" ref={suggestionsRef}>
          <ul>
            {suggestions.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s.name}, <small>{s.region}</small>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <WeatherData cityname={cityname} />
    </div>
  );
};

export default App;

