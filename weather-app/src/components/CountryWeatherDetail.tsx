import { City, Country } from "../types";
import { IoArrowBack } from "react-icons/io5";
import { getWeatherIcon } from "../helper/getWeatherIcon";

const CountryWeatherDetail = ({
    city,
    country,
    goBack,
}: {
    city: City;
    country: Country;
    goBack: () => void;
}) => {
    const w = city.weather;

    return (
        <div className="flex flex-col h-full text-white relative">
            <button
                onClick={goBack}
                className="absolute top-3 left-3 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            >
                <IoArrowBack className="text-2xl" />
            </button>

            <div className="flex flex-col items-center mt-12">
                <h2 className="text-2xl font-bold">
                    {city.name}, {country.country}
                </h2>
                <div className="flex flex-col items-center mt-6">
                    {getWeatherIcon(w.condition)}
                    <p className="mt-2 text-xl font-semibold">
                        {w.value}°{w.unit} - {w.condition}
                    </p>
                    {w.feelsLike && (
                        <p className="text-sm text-gray-400">
                            Feels like {w.feelsLike}°{w.unit}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10 px-4">
                <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Humidity</p>
                    <p className="text-lg font-semibold">{w.humidity}%</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Wind</p>
                    <p className="text-lg font-semibold">
                        {w.wind.speed} km/h {w.wind.direction ?? ""}
                    </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Visibility</p>
                    <p className="text-lg font-semibold">{w.visibility} km</p>
                </div>
                {w.pressure && (
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">Pressure</p>
                        <p className="text-lg font-semibold">{w.pressure} hPa</p>
                    </div>
                )}
                {w.uvIndex !== undefined && (
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">UV Index</p>
                        <p className="text-lg font-semibold">{w.uvIndex}</p>
                    </div>
                )}
                {w.sunrise && (
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">Sunrise</p>
                        <p className="text-lg font-semibold">{w.sunrise}</p>
                    </div>
                )}
                {w.sunset && (
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">Sunset</p>
                        <p className="text-lg font-semibold">{w.sunset}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountryWeatherDetail;
