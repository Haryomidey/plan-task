export type SplashScreenProps = {
    setSteps: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
};

export type TemperatureProps = {
    value: number;
    unit?: "C" | "F" | "K";
    condition: "sunny" | "rainy" | "cloudy" | "stormy" | "snowy" | "moody" | "foggy" | "windy";
    humidity: number;
    wind: {
        speed: number;
        direction?: string;
    };
    visibility: number;
    feelsLike?: number;
    pressure?: number;
    uvIndex?: number;
    sunrise?: string;
    sunset?: string;
};

export type TemperatureProps = {
    value: number;
    unit?: "C" | "F" | "K";
    condition: "sunny" | "rainy" | "cloudy" | "stormy" | "snowy" | "moody" | "foggy" | "windy";
    humidity: number;
    wind: {
        speed: number;
        direction?: string;
    };
    visibility: number;
    feelsLike?: number;
    pressure?: number;
    uvIndex?: number;
    sunrise?: string;
    sunset?: string;
};

export type City = {
    id: number;
    name: string;
    weather: TemperatureProps;
};

export type Country = {
    id: number;
    country: string;
    cities: City[];
};

export type WeatherProps =  {
    weatherLists: Country[];
    selectedCountry: Country | null;
    setSelectedCountry: (country: Country | null) => void;
    onSelectCity: (city: any, country: Country) => void;
}