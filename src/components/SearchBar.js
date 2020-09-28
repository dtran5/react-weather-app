import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import '../assets/searchBar.css'

const SearchBar = (props) => {
    const [city, setCity] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
        
        //receiving the getweather function here and passing in the city we searched
        //city state is set down below onChange
        props.onSubmit(city)
    }
    
    const handleError = () => {
        return (
            <div className="alert alert-danger mx-5">
                Please enter a valid city
            </div>
        )
    }
    return (
        <div className="verticalAlign">
            <Form onSubmit={onFormSubmit}>
                <Row>
                    <Col
                         xs={{ span: 8, offset: 2 }}
                         sm={{ span: 8, offset: 2 }}
                         md={{ span: 4, offset: 4 }}
                         lg={{ span: 4, offset: 4 }}
                         
                    >
                        {props.error ? handleError() : ''}
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={{ span: 8, offset: 2 }}
                        sm={{ span: 8, offset: 2 }}
                        md={{ span: 4, offset: 4 }}
                        lg={{ span: 4, offset: 4 }}
                        className="my-auto"
                    >
                        <div className="form">
                            <input
                                className="searchbar" 
                                type="text"
                                name="location"
                                onChange={(e) => setCity(e.target.value)}
                                autoComplete="off"

                            />
                        <Button
                            type="submit"
                        >Get Weather
                        </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
   
    
    

export default SearchBar