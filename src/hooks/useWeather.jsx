import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });
  const [loading, setLoading] = useState({ state: false, message: "" });
  const [error, setError] = useState(null);

  const { selectedLocation } = useContext(LocationContext);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      // set Loading
      setLoading({
        ...loading,
        state: true,
        message: "Fetching Weather Data",
      });
      // fetch data
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_Weather_API_Key
        }&units=metric`
      );
      // fetch data failed condition
      if (!response.ok) {
        const errorMessage = `Fetching Weather Data failed: ${response.status}`;
        throw new Error(errorMessage);
      }
      //   fetch data success condition
      else {
        const data = await response.json();

        const updateWeatherData = {
          ...weatherData,
          location: data?.name,
          climate: data?.weather[0]?.main,
          temperature: data?.main?.temp,
          maxTemperature: data?.main?.temp_max,
          minTemperature: data?.main?.temp_min,
          humidity: data?.main?.humidity,
          cloudPercentage: data?.clouds?.all,
          wind: data?.wind?.speed,
          time: data?.dt,
          longitude: longitude,
          latitude: latitude,
        };
        // set weather data
        setWeatherData(updateWeatherData);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };
  useEffect(() => {
    setLoading({
      ...loading,
      state: true,
      message: "Finding Location...",
    });
    if (selectedLocation.latitude && selectedLocation.longitude) {
      fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [selectedLocation.latitude, selectedLocation.longitude]);
  return {
    weatherData,
    error,
    loading,
  };
};

export default useWeather;
