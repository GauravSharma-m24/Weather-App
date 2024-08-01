import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Weather.css"
import clouds from "../assets/clouds.png"
import cloudy from "../assets/cloudy.png"
import hot from "../assets/hot.png"
import snow from "../assets/snow.png"
import storm from "../assets/storm.png"
import sun from "../assets/sun.png"
import wind from "../assets/wind.png"
import drizzle from "../assets/drizzle.png"



const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": sun,
        "01n": sun,
        "02d": cloudy,
        "02n": cloudy,
        "03d": clouds,
        "03n": clouds,
        "04d": drizzle,
        "04n": drizzle,
        "13d": snow,
        "13n": snow,
        "09d": storm,
        "09n": storm,
    }

     const search = async (city) => {
        if(city === "")
        {
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
                         &units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url)
            const data = await response.json()

            if(!response.ok)
            {
                alert(data.message);
                return;
            }

            console.log(data)
            const icon = allIcons[data.weather[0].icon] || sun
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch(error){
            setWeatherData(false)
            console.error("Error in fetching data")
        }
     }

     useEffect(() => {
        search("Chicago")
     },[])

    return(
        
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search" />
                <FiSearch className="search-icon" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData?<>
                <img src={weatherData.icon} alt="" className="weather-icon"/>
            <p className="temp">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={hot} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} KPH</p>
                        <span>Wind</span>
                    </div>
                </div>
            </div>
            </>:<></>}
            
        </div>
        
    )
}

export default Weather