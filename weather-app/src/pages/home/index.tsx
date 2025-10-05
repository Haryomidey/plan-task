import { useState, useEffect } from "react";
import SplashScreen from "../../components/SplashScreen";
import CountryWeatherList from "../../components/CountryWeatherList";
import CountryWeatherDetail from "../../components/CountryWeatherDetail";
import { weatherLists } from "../../data/weatherLists";
import { City, Country } from "../../types";

const Home = () => {
    const [steps, setSteps] = useState<1 | 2 | 3>(1);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    useEffect(() => {
        if (!selectedCountry && weatherLists.length > 0) {
            setSelectedCountry(weatherLists[0]);
        }
    }, [selectedCountry]);

    const handleSelectCity = (city: City, country: Country) => {
        setSelectedCity(city);
        setSelectedCountry(country);
        setSteps(3);
    };

    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="w-sm h-[95%] max-h-[600px] rounded-3xl overflow-y-scroll primary-bg-color !p-5">
                {steps === 1 && <SplashScreen setSteps={setSteps} />}

                {steps === 2 && (
                    <CountryWeatherList
                        weatherLists={weatherLists}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        onSelectCity={handleSelectCity}
                    />
                )}

                {steps === 3 && selectedCity && selectedCountry && (
                    <CountryWeatherDetail
                        city={selectedCity}
                        country={selectedCountry}
                        goBack={() => setSteps(2)}
                    />
                )}
            </div>
        </main>
    );
};

export default Home;