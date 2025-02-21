import React, { useEffect, useState } from 'react';
import { FaSun, FaCloudRain, FaSnowflake, FaCloud, FaSmog } from 'react-icons/fa';

const WeatherCard: React.FC = () => {
    const [weather, setWeather] = useState<{ temperature: number; condition: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            const apiKey = 'dab3af44de7d24ae7ff86549334e45bd';
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
            );
            const data = await response.json();

            if (data.main && data.weather && data.weather.length > 0) {
                setWeather({
                    temperature: Math.round(data.main.temp - 273.15),
                    condition: data.weather[0].main,
                });
            } else {
                console.error("Unexpected weather data structure:", data);
                setWeather(null);
            }
        } catch (error) {
            console.error("Error fetching weather:", error);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = () => {
        if (!weather) return null;
        switch (weather.condition.toLowerCase()) {
            case 'clear':
                return <FaSun className="text-yellow-400 text-4xl" />;
            case 'rain':
                return <FaCloudRain className="text-blue-400 text-4xl" />;
            case 'snow':
                return <FaSnowflake className="text-white text-4xl" />;
            case 'clouds':
                return <FaCloud className="text-gray-400 text-4xl" />;
            case 'mist':
            case 'smoke':
                return <FaSmog className="text-gray-500 text-4xl" />;
            default:
                return <FaCloud className="text-gray-400 text-4xl" />;
        }
    };

    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour === 0) return "midnight";
        if (hour < 6) return "early morning";
        if (hour < 12) return "morning";
        if (hour === 12) return "noon";
        if (hour < 18) return "afternoon";
        if (hour < 21) return "evening";
        return "night";
    };

    return (
        <div className="p-6 bg-gray-800 shadow-lg rounded-lg flex items-center h-[270px] w-[520px]
                    bg-[url('https://themewagon.github.io/skydash/images/dashboard/people.svg')]
                    bg-no-repeat bg-right bg-contain">
            <div className="flex content-end items-end ml-auto mb-auto">
                {loading ? (
                    <p className="text-lg font-semibold text-gray-400">Loading weather...</p>
                ) : weather ? (
                    <>
                        <span className="flex justify-center items-center scale-150 m-5">
                            {getWeatherIcon()}
                        </span>
                        <div className="ml-4">
                            <p className="text-md font-semibold text-gray-600 capitalize">{getTimeOfDay()}</p>
                            <p className="text-3xl font-bold text-gray-800">{weather.temperature}° C</p>
                            <p className="text-lg font-semibold text-gray-600">{weather.condition}</p>
                        </div>
                    </>
                ) : (
                    <p className="text-lg font-semibold text-red-500">Failed to load weather</p>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
