import React, { useState } from "react";
import { Container, Input, Heading, Text, Box, Image } from "@chakra-ui/react";

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
      <Heading as="h1" size="2xl" align="center" pt={10} color="#fff">
        The Weather Canal
      </Heading>
      <Container centerContent className="container">
        <form onSubmit={handleSubmit}>
          <Input
            variant="filled"
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
        {typeof weather.main != "undefined" && (
          <Box
            boxShadow="md"
            p="6"
            rounded="md"
            bg="#32425C"
            color="#fff"
            mb="10"
          >
            <Text fontSize="4xl" align="center" className="city">
              {weather.name}, {weather.sys.country}
            </Text>
            <Text align="center">{dateCapitalized}</Text>
            <Box align="center">
              <Image
                boxSize="200px"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <Text fontSize="xl" align="center" mb={7}>
                {weather.weather[0].main}
              </Text>
            </Box>
            <Heading as="h1" size="4xl" align="center" mb={2} ml={6}>
              {Math.round(weather.main.temp)}°
            </Heading>
            <Text align="center" mb={2}>
              Feels like {Math.round(weather.main.feels_like)}°
            </Text>
            <Text align="center">
              Today's max/min: {Math.round(weather.main.temp_max)}° /{" "}
              {Math.round(weather.main.temp_min)}°
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
}
