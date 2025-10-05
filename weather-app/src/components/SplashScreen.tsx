import { FaUmbrella } from "react-icons/fa6";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { SplashScreenProps } from "../types";


const SplashScreen = ({ setSteps }: SplashScreenProps) => {
    return (
        <div className="flex justify-center items-center flex-col gap-20 w-full h-full">
            <FaUmbrella className="text-[#1798D3] text-7xl" />
            <div>
                <h2 className="text-3xl font-semibold">Breeze</h2>
                <p>Weather App</p>
            </div>
            <button
                onClick={() => setSteps(2)}
                className="bg-[#0293FF] h-10 w-10 rounded-full flex items-center justify-center"
            >
                <HiOutlineArrowNarrowRight />
            </button>
        </div>
    );
};

export default SplashScreen;