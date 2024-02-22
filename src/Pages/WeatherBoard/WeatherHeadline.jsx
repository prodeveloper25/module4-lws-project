import { useContext } from "react";
import cloudImg from "../../assets/cloud.svg";
import hazeImg from "../../assets/haze.svg";
import snowImg from "../../assets/icons/snow.svg";
import sunnyImg from "../../assets/icons/sunny.svg";
import pinImg from "../../assets/pin.svg";
import rainImg from "../../assets/rainy.svg";
import thunderImg from "../../assets/thunder.svg";
import { WeatherContext } from "../../context";
import { getFormattedDate } from "../../utils/date-util";

const WeatherHeadline = () => {
  const { weatherData } = useContext(WeatherContext);
  const { climate, location, temperature, time } = weatherData;

  function getWeatherIcon(climate) {
    switch (climate) {
      case "Rain":
        return rainImg;
      case "Clouds":
        return cloudImg;
      case "Clear":
        return sunnyImg;
      case "Snow":
        return snowImg;
      case "Thunder":
        return thunderImg;
      case "Fog":
        return hazeImg;
      case "Haze":
        return hazeImg;
      case "Mist":
        return hazeImg;

      default:
        return sunnyImg;
    }
  }
  return (
    <div>
      <div className="max-md:flex items-center justify-between md:-mt-10">
        <img src={getWeatherIcon(climate)} alt="climate" />
        <div className="max-md:flex items-center max-md:space-x-4">
          <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
            {temperature}°
          </h1>
          <div className="flex items-center space-x-4 md:mb-4">
            <img src={pinImg} />
            <h2 className="text-2xl lg:text-[50px]">{location}</h2>
          </div>
        </div>
      </div>
      <p className="text-sm lg:text-lg">
        {getFormattedDate(time, "time", false)} -{" "}
        {getFormattedDate(time, "date", false)}
      </p>
    </div>
  );
};

export default WeatherHeadline;
