import React from 'react';
import { FaSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

interface WeatherCardProps {
    temperature: number;
    condition: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ temperature, condition }) => {
    const getWeatherIcon = () => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return <FaSun className="text-yellow-400 text-4xl" />;
            case 'rainy':
                return <FaCloudRain className="text-blue-400 text-4xl" />;
            case 'snowy':
                return <FaSnowflake className="text-white text-4xl" />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-800 shadow-lg rounded-lg flex items-center h-[270px] w-[520px]
                    bg-[url('https://themewagon.github.io/skydash/images/dashboard/people.svg')]
                    bg-no-repeat bg-right bg-contain">

            <div className="flex">
                {getWeatherIcon()}
            </div>

            <div className="ml-4">
                <p className="text-lg font-semibold text-gray-300">Temperature</p>
                <p className="text-2xl font-bold text-gray-100">{temperature}°C</p>
                <p className="text-lg font-semibold text-gray-300">{condition}</p>
            </div>
        </div>
    );
};

export default WeatherCard; 