import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';


import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import DisplayWeather from './DisplayWeather'
import SearchBar from './SearchBar'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

const App = () => {

    const [city, setCity] = useState('')
    

    const [results, setResults] = useState({
        dailyLow: '',
        dailyMax: '',
        description: '',
        currentTemp: '',
        id: '',
        icon: '',
        error: false
    })

    const weatherIcons = {
        Sunny: 'wi wi-day-sunny',
        Cloudy: 'wi wi-cloudy',
        Drizzle: 'wi wi-storm-sprinkle',
        Rainy: 'wi wi-showers',
        Snow: 'wi wi-snow',
        Thunderstorm: 'wi wi-thunderstorm',
        Atmosphere: 'wi wi-fog'

    }

    const weatherType = (icons, id) => {
        switch (true) {
            case id >= 200 && id <=232:
                setResults({icon: icons.Thunderstorm})
                break
            case id >= 300 && id <= 321:
                setResults({icon: icons.Drizzle})
                break
            case id >= 500 && id <= 531:
                setResults({icon: icons.Rainy})
                break
            case id >= 600 && id <= 622:
                setResults({icon: icons.Snow})
                break
            case id >= 701 && id <= 781:
                setResults({icon: icons.Atmosphere})
                break
            case id === 800:
                setResults({icon: icons.Sunny})
                console.log('eqwewqe');
                break
            case id >= 801 && id <= 804:
                setResults({icon: icons.Cloudy})
                console.log('weqweqwe');
                break
         
            
        }
    }


    const getWeather = async (city) => {
        if (city) {
        // const locationValue = (e.target.elements.location.value); //selects input with name === location

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

        setResults({ currentTemp: Math.round(response.data.main.temp),
            dailyLow: Math.round(response.data.main.temp_min),
            dailyMax: Math.round(response.data.main.temp_max),
            description: response.data.weather[0].description,
            id: response.data.weather[0].id 
        })
        
        setCity(response.data.name)
        
        } else {
            setResults({ error: true })
        }
    }
   

    return (
        <div>
          
            {/* <Container>
                <Row>
                    <Col>
                        <DisplayWeather 
                            city={city}
                            currentTemp={currentTemp}
                            dailyLow={dailyLow}
                            dailyMax={dailyMax}
                            description={description}
                            icon={icon}
                        />
                    </Col>
                </Row>
                <SearchBar onSubmit={searchWeather}/>
            </Container> */}
            {/* <DisplayWeather 
                results={results.currentTemp}
            /> */}
            <DisplayWeather
                city={city}
                dailyLow={results.dailyLow}
                dailyMax={results.dailyMax}
                currentTemp={results.currentTemp}
                description={results.description}
                icon={results.icon} 
            />
            <SearchBar 
                onSubmit={getWeather}
                error={results.error}
            />
          

        </div>
    );
}

export default App