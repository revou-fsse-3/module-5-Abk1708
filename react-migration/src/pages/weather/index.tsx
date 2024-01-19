// pages/weather.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import humidity_icon from "../../assets/humidity.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/layouts";
import Head from "next/head";
import { NextPageWithLayout } from "../_app";
import { GetServerSideProps, NextPage } from "next";

interface WeatherData {
    main: {
        humidity: number;
        temp: number;
    };
    wind: {
        speed: number;
    };
    name: string;
    weather: {
        icon: string;
    }[];
}

interface WeatherPageProps {
    initialWeatherData: WeatherData;
}

const WeatherPage: NextPage<WeatherPageProps> = ({
    initialWeatherData,
}: {
    initialWeatherData: WeatherData;
}) => {
    const [weatherIcon, setWeatherIcon] = useState<string>(cloud_icon);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [windSpeed, setWindSpeed] = useState<number | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [location, setLocation] = useState<string | null>(null);

    useEffect(() => {
        if (initialWeatherData) {
            setHumidity(initialWeatherData.main.humidity);
            setWindSpeed(Math.floor(initialWeatherData.wind.speed));
            setTemperature(Math.floor(initialWeatherData.main.temp));
            setLocation(initialWeatherData.name);
            setWeatherIcon(getWeatherIcon(initialWeatherData.weather[0].icon));
        }
    }, [initialWeatherData]);

    const fetchData = async (city: string) => {
        const api_key = "73794e69bcc1eb17cba6a7eeb23e6d48";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

        try {
            const response = await axios.get<WeatherData>(url);
            const data = response.data;

            setHumidity(data.main.humidity);
            setWindSpeed(Math.floor(data.wind.speed));
            setTemperature(Math.floor(data.main.temp));
            setLocation(data.name);
            setWeatherIcon(getWeatherIcon(data.weather[0].icon));
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const getWeatherIcon = (icon: string): string => {
        switch (icon) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
                return cloud_icon;
            case "03d":
            case "03n":
                return drizzle_icon;
            case "04d":
            case "04n":
                return drizzle_icon;
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return clear_icon;
        }
    };

    const handleSearch = () => {
        const userInput =
            (document.getElementsByClassName(
                "userInput"
            )[0] as HTMLInputElement) || null;
        if (userInput && userInput.value !== "") {
            fetchData(userInput.value);
        }
    };

    return (
        <>
            <Head>
                <title>Weather Page</title>
            </Head>
            <Card className="container flex flex-col items-center w-2/5 h-card m-auto mt-75px rounded-3xl bg-gradient-to-b from-sky-500 to-indigo-500">
                <CardHeader className="card-header flex flex-row justify-center gap-3.5 pt-10 ">
                    <Input
                        type="text"
                        placeholder="City"
                        className="userInput flex w-96 h-20 bg-neutral-100 border-none outline-none rounded-3xl pl-10 text-gray-700 text-xl font-normal"
                        suppressHydrationWarning
                    />
                    <div
                        className="search-icon flex justify-center items-center w-20 h-20 bg-neutral-100 rounded-full cursor-pointer"
                        onClick={handleSearch}
                    >
                        <Image
                            src={search_icon}
                            alt=""
                            suppressHydrationWarning
                        />
                    </div>
                </CardHeader>
                <CardContent
                    className="weather-image mt-7 flex justify-center"
                    suppressHydrationWarning
                >
                    <Image src={weatherIcon} alt="" />
                </CardContent>
                <CardDescription className="weather-temp flex h-16 justify-center text-white text-6xl font-normal">
                    {temperature}°
                </CardDescription>
                <CardDescription className="weather-location flex h-16 justify-center text-white text-6xl font-normal">
                    {location}
                </CardDescription>
                <CardContent className="data-container mt-14 text-white flex justify-center">
                    <CardContent className="element m-auto flex items-start gap-3.5">
                        <Image src={humidity_icon} alt="" className="icon" />
                        <CardDescription className="data text-2xl font-normal w-52 text-white">
                            {humidity}% Humidity
                        </CardDescription>
                    </CardContent>
                    <CardContent className="element m-auto flex items-start gap-3.5">
                        <Image src={wind_icon} alt="" className="icon" />
                        <CardDescription className="data text-2xl font-normal w-52 text-white">
                            {windSpeed} km/h Wind Speed
                        </CardDescription>
                    </CardContent>
                </CardContent>
            </Card>
        </>
    );
};

WeatherPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps = async () => {
    const defaultCity = "London";
    const api_key = "73794e69bcc1eb17cba6a7eeb23e6d48";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=Metric&appid=${api_key}`;

    try {
        const response = await axios.get<WeatherData>(url);
        const initialWeatherData = response.data;

        return {
            props: {
                initialWeatherData,
            },
        };
    } catch (error) {
        console.error("Error fetching initial weather data:", error);
        return {
            props: {
                initialWeatherData: null,
            },
        };
    }
};

export default WeatherPage;
