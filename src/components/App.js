import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import DisplayWeather from './DisplayWeather';
import SearchBar from './SearchBar';

import '../assets/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    //state for weekly forecast
    const [city, setCity] = useState('')
    const [weeklyTemps, setWeeklyTemps] = useState([])
    //state for single day forecast
    const [results, setResults] = useState({
        dailyLow: '',
        dailyMax: '',
        description: '',
        currentTemp: '',
        id: '',
        error: false,
        date: ''
    })

    //conditional classes using classNames package
    const backgroundClassNames = classNames({
        Thunderstorm:  results.id >= 200 && results.id <= 232,
        Drizzle: results.id >= 300 && results.id <= 321,
        Rainy: results.id >= 500 && results.id <= 531,
        Snow: results.id >= 600 && results.id <= 622,
        Atmosphere: results.id >= 701 && results.id <= 781,
        Sunny: results.id === 800,
        Cloudy: results.id >= 801 && results.id <= 804
        
    })


    //setting weathertype icons for depending on temperature
    //values come from api
    const weatherType = (icons, id) => {
        if (id >= 200 && id <=232) {
            return (icons.Thunderstorm)
        } else if (id >= 300 && id <= 321) {
            return (icons.Drizzle)
        } else if (id >= 500 && id <= 531) {
            return (icons.Rainy)
        } else if (id >= 600 && id <= 622) {
            return (icons.Snow) 
        } else if (id >= 701 && id <= 781) {
            return (icons.Atmosphere)
        } else if (id === 800) {
            return (icons.Sunny)
        } else {
            return (icons.Cloudy)
        }
    }

    //weathericon classNames
    const weatherIcons = {
        Sunny: 'wu wu-32 wu-black wu-clear',
        Cloudy: 'wu wu-32 wu-black wu-cloudy',
        Drizzle: 'wu wu-32 wu-black wu-rain',
        Rainy: 'wu wu-32 wu-black wu-rain',
        Snow: 'wu wu-32 wu-black wu-snow',
        Thunderstorm: 'wu wu-32 wu-black wu-tstorms',
        Atmosphere: 'wu wu-32 wu-black wu-hazy'

    }


    //when city value changes, rerender the webpage
    useEffect(() => {
        getWeeklyWeather(city)
    }, [city]);
    
    //Weekly weather api call
    const getWeeklyWeather = async (city) => {
        if (city) {
            const api = {
                key: process.env.REACT_APP_API_KEY,
                base: 'https://api.openweathermap.org'
            }

            const response = await axios.get(`${api.base}/data/2.5/forecast?q=${city}&appid=${api.key}`, {
                params: {
                    units: 'imperial'
                }
            })

            const weeklyWeather = response.data.list
            console.log(response);

            //api returns temp for every 3 hours. every 8th item in array is a new day
            const filteredWeeklyWeather = weeklyWeather.filter((element, index) => {
                return index % 8 === 0
            })

            //map through array and create a new object containing these 4 properties for each day
            const weeklyTemps = filteredWeeklyWeather.map((day) => {
                return ({
                    date: new Date(day.dt_txt).toDateString(),
                    temp: Math.round(day.main.temp),
                    id: day.weather[0].id,
                    icon: weatherType(weatherIcons, day.weather[0].id),
                    description: day.weather[0].description
                })
            })
            setWeeklyTemps(weeklyTemps)
        }
    }

    //Current day forecast api call
    const getWeather = async (city) => {
        if (city) {

        //requesting our weather data from api
        //setting state to the results 
        //pass the getweather function to the searchbar child component

        const api = {
            key: 'a34ee127b3a89ae0cd56579376626b77',
            base: 'https://api.openweathermap.org/'
        }

        const response = await axios.get(`${api.base}/data/2.5/weather?q=${city}&appid=${api.key}`, {
            params: {
                units: 'imperial'
            },
        });

        
        setResults({ 
            currentTemp: Math.round(response.data.main.temp),
            dailyLow: Math.round(response.data.main.temp_min),
            dailyMax: Math.round(response.data.main.temp_max),
            description: response.data.weather[0].description,
            id: response.data.weather[0].id,
            icon: weatherType(weatherIcons, response.data.weather[0].id),
            
            
        })

        
        setCity(response.data.name)
        
        } else {
            setResults({ error: true })
        }
    }



    //switch statement for weathertype instead of if/else (not corrected with new code)
    // const weatherType = (icons, id) => {
    //     switch (true) {
    //         case id >= 200 && id <=232:
    //             return icons.Thunderstorm
    //             break
    //         case id >= 300 && id <= 321:
    //             return icons.Drizzle)
    //             break
    //         case id >= 500 && id <= 531:
    //             return icons.Rainy)
    //             break
    //         case id >= 600 && id <= 622:
    //             return icons.Snow)
    //             break
    //         case id >= 701 && id <= 781:
    //             return icons.Atmosphere)
    //             break
    //         case id === 800:
    //             return icons.Sunny)
    //             console.log(icons.Sunny);
    //             break
    //         case id >= 801 && id <= 804:
    //             return icons.Cloudy)
    //             console.log(icons.Cloudy);
    //             break
    //         default:
    //             return 'default')
    //     }
    // }
    
  
  

    return (
        <div className={backgroundClassNames}>
            <DisplayWeather
                city={city}
                dailyLow={results.dailyLow}
                dailyMax={results.dailyMax}
                currentTemp={results.currentTemp}
                description={results.description}
                icon={results.icon}
                weeklyTemps={weeklyTemps}
            />
            <SearchBar
                currentDayForecastSubmit={getWeather}
                weeklyForcastSubmit={getWeeklyWeather}
                error={results.error}
            />
        </div>
    );
}

export default App