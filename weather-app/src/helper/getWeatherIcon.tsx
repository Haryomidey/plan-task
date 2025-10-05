import { FaSun, FaCloud, FaCloudRain, FaWind, FaSmog } from "react-icons/fa";
import { WiDayFog } from "react-icons/wi";

export const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
        case "sunny":
            return <FaSun className="text-yellow-400 text-xl" />;
        case "rainy":
            return <FaCloudRain className="text-blue-400 text-xl" />;
        case "cloudy":
            return <FaCloud className="text-gray-400 text-xl" />;
        case "windy":
            return <FaWind className="text-cyan-400 text-xl" />;
        case "foggy":
            return <WiDayFog className="text-gray-500 text-xl" />;
        case "moody":
            return <FaSmog className="text-gray-500 text-xl" />;
        default:
            return <FaSun className="text-yellow-400 text-xl" />;
    }
};