import React, { useState } from "react";

export default function FetchWeather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`;

  const fetchSearchCountry = async (e) => {
    e.preventDefault();
    const response = await fetch(url);
    const weather = await response.json();
    setWeather(weather);
    console.log(weather);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <form className="App" onSubmit={fetchSearchCountry}>
        <input
          placeholder="enter city"
          value={query}
          onChange={handleChange}
        ></input>
      </form>
    </>
  );
}
