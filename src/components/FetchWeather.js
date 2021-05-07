import React, { useState } from "react";
import { Container, Input, Heading, Text, Box } from "@chakra-ui/react";

export default function FetchWeather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`;

  const date = new Date();
  const currentDate = date.toLocaleString("default", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dateCapitalized = currentDate[0].toUpperCase() + currentDate.slice(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box bg="#243755" h="100vh">
      <Heading as="h1" size="2xl" align="center" pt={3} color="#fff">
        The Weather Canal{" "}
      </Heading>
      <Container centerContent className="container">
        <form onSubmit={handleSubmit}>
          <Input
            boxShadow="md"
            p="6"
            rounded="md"
            color="#fff"
            bg="#32425C"
            my={10}
            placeholder="Enter City"
            value={query}
            onChange={handleChange}
          ></Input>
        </form>
        {typeof weather.main != "undefined" ? (
          <Box boxShadow="md" p="6" rounded="md" bg="#32425C" color="#fff">
            <Text align="center" className="city">
              {weather.name}
            </Text>
            <Text align="center">{dateCapitalized}</Text>
            <Heading as="h1" size="4xl" align="center">
              {weather.main.temp}°
            </Heading>
            <Text align="center">Feels like {weather.main.feels_like}°</Text>
            <Text align="center">
              Today's max/min: {weather.main.temp_max}°/{weather.main.temp_min}°
            </Text>
          </Box>
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
}
