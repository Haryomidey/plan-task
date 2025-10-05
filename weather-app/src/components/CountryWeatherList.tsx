import { useState } from "react";
import { Country, WeatherProps } from "../types";
import { getWeatherIcon } from "../helper/getWeatherIcon";

const CountryWeatherList = ({
    weatherLists,
    selectedCountry,
    setSelectedCountry,
    onSelectCity,
}: WeatherProps) => {
    const [search, setSearch] = useState("");

    const suggestions =
        search.trim().length > 0
            ? weatherLists.filter((c) =>
                  c.country.toLowerCase().includes(search.toLowerCase())
              )
            : [];

    const handleSelectCountry = (country: Country) => {
        setSelectedCountry(country);
        setSearch("");
    };

    return (
        <div className="!mb-5 w-full h-full">
            <div className="w-full flex flex-col gap-2 text-sm relative">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a country..."
                    className="bg-[var(--background-color)] w-full !px-2 !py-2 rounded-md"
                />

                {search && suggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 w-full bg-gray-800 rounded-md shadow-md z-10 max-h-80 overflow-y-auto">
                        {suggestions.map((country) => (
                            <li
                                key={country.id}
                                onClick={() => handleSelectCountry(country)}
                                className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                            >
                                {country.country}
                            </li>
                        ))}
                    </ul>
                )}

                {search && suggestions.length === 0 && (
                    <ul className="absolute top-full mt-1 w-full bg-gray-800 rounded-md shadow-md z-10">
                        <li className="px-3 py-2 text-gray-400">No matches</li>
                    </ul>
                )}
            </div>

            <ul className="!mt-7 flex items-center gap-4 flex-col">
                {selectedCountry ? (
                    selectedCountry.cities.map((city) => (
                        <li
                            key={city.id}
                            className="!py-3 !px-2 min-h-[70px] w-full rounded-2xl bg-[var(--background-color)] flex items-center justify-between cursor-pointer"
                            onClick={() => onSelectCity(city, selectedCountry)}
                        >
                            <p className="font-medium">{city.name}</p>
                            <div className="flex items-center gap-2">
                                {getWeatherIcon(city.weather.condition)}
                                <span>
                                    {city.weather.value}°{city.weather.unit}
                                </span>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400">No country selected</li>
                )}
            </ul>
        </div>
    );
};

export default CountryWeatherList;