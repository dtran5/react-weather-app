import React, { useState, useEffect } from 'react';
import axios from 'axios';



import DisplayWeather from './DisplayWeather';
import SearchBar from './SearchBar';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

const App = () => {

    const [city, setCity] = useState('')
    const [weeklyTemps, setWeeklyTemps] = useState([])

    //when city value changes, rerender the webpage
    useEffect(() => {
        getWeeklyWeather(city)
    }, [city]);
     
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

            //api returns temp for every 3 hours. every 8th item in array is a new day
            const filteredWeeklyWeather = weeklyWeather.filter((element, index) => {
                return index % 8 === 0
            })

            
            const weeklyTemps = filteredWeeklyWeather.map((day) => {
                return ({
                    date: new Date(day.dt_txt).toDateString(),
                    temp: Math.round(day.main.temp),
                    id: day.weather[0].id
                })
            })

            console.log(weeklyTemps);
            setWeeklyTemps(weeklyTemps)        
        }
    }

    const [results, setResults] = useState({
        dailyLow: '',
        dailyMax: '',
        description: '',
        currentTemp: '',
        id: '',
        icon: '',
        error: false
    })

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
            
        })

        
        setCity(response.data.name)
        
        
        } else {
            setResults({ error: true })
        }
    }

    // const weatherIcons = {
    //     Sunny: 'wi wi-day-sunny',
    //     Cloudy: 'wi wi-cloudy',
    //     Drizzle: 'wi wi-storm-sprinkle',
    //     Rainy: 'wi wi-showers',
    //     Snow: 'wi wi-snow',
    //     Thunderstorm: 'wi wi-thunderstorm',
    //     Atmosphere: 'wi wi-fog'

    // }

    // const weatherType = (icons, id) => {
    //     switch (true) {
    //         case id >= 200 && id <=232:
    //             setResults({icon: icons.Thunderstorm})
    //             break
    //         case id >= 300 && id <= 321:
    //             setResults({icon: icons.Drizzle})
    //             break
    //         case id >= 500 && id <= 531:
    //             setResults({icon: icons.Rainy})
    //             break
    //         case id >= 600 && id <= 622:
    //             setResults({icon: icons.Snow})
    //             break
    //         case id >= 701 && id <= 781:
    //             setResults({icon: icons.Atmosphere})
    //             break
    //         case id === 800:
    //             setResults({icon: icons.Sunny})
    //             console.log('eqwewqe');
    //             break
    //         case id >= 801 && id <= 804:
    //             setResults({icon: icons.Cloudy})
    //             console.log('weqweqwe');
    //             break
         
            
    //     }
    // }


    return (
        <div>
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
                onSubmit={getWeather}
                handleSubmit={getWeeklyWeather}
                error={results.error}
            />
        </div>
    );
}

export default App