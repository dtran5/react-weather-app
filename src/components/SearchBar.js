import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import '../assets/searchBar.css'

const SearchBar = (props) => {
    const [city, setCity] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
        
        //receiving the getweather function here and passing in the city we searched
        //city state is set down below onChange
        props.currentDayForecastSubmit(city)
        props.weeklyForcastSubmit(city)
        
        
    }
    
    const handleError = () => {
        return (
            <div className="alert alert-danger mx-5 my-5">
                Please enter a valid city
            </div>
        )
    }
    return (
        <div className="verticalAlign" style={{ marginTop: '2rem' }}>
            <Form onSubmit={onFormSubmit}>
                <Row>
                    <Col
                        xs={{ span: 8, offset: 2 }}
                        sm={{ span: 8, offset: 2 }}
                        md={{ span: 4, offset: 4 }}
                        lg={{ span: 4, offset: 4 }}
                        className="my-auto"
                    >
                        <Form.Control
                            className="searchbar mx-1" 
                            type="text"
                            name="location"
                            onChange={(e) => setCity(e.target.value)}
                            // autoComplete="off"
                            placeholder="Enter City"
                        >
                            
                        </Form.Control>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
   
    
    

export default SearchBar