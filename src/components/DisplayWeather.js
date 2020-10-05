import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';


const DisplayWeather = (props) => {

    const renderWeeklyTemps = props.weeklyTemps.map((day) => {
        return (
            <div key={day.date}>
                <Card className="border-1" style={{ width: '10rem' }}>
                    <Card.Img />
                    <Card.Body className={`${day.icon} text-center`}>
                        <Card.Title style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{day.date}</Card.Title>
                        <Card.Text>
                        
                        {day.temp}&deg;F
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    })

    const renderHighAndLow = () => {
        if (props.city) {
            return (
                <Card 
                    className="bg-transparent border-0" 
                    style={{ width: '100%', marginTop: '2.0rem', textAlign: 'center' }}
                >
                    <Card.Body>
                        <div className={`${props.icon} display-3 text-center`} style={{ color: 'white' }}>

                            <h4 style={{ marginTop: '1rem' }}>
                                <span className="px-4 h6">{props.dailyLow}&deg;F</span>
                                <span className="px-4 h6">{props.dailyMax}&deg;F</span>
                            </h4>
                        </div>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderTemp = () => {
        if(props.city) {
            return (
                <div>
                    <Card className="bg-transparent border-0" style={{ width: '100%', height: '100%', marginTop: '1.5rem', textAlign: 'center' }}>
                        <Card.Img variant="top"/>
                        <Card.Body>
                            <Card.Title className="text-center text-white">{props.city}</Card.Title>
                            <Card.Title className="text-center text-white">
                            <h1 className="py-2">{props.currentTemp}&deg;F</h1>
                            
                            <h5>{props.description}</h5>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            );
        } 
    }
    
    return (
        <div>
            <Container>
                <Row style={{ marginTop: '4rem' }}>
                    <Col 
                  
                    >
                        {renderTemp()}
                    </Col>
                    <Col
                      
                        >
                        {renderHighAndLow()}
                    </Col>
                </Row>
                <Row>
                    <Col 
                        xs={{ span: 12, offset: 4 }}
                        sm={{ span: 12, offset: 1 }}
                        md={{ span: 12, offset: 1 }}
                        lg={{ span: 12, offset: 1 }}
                        xl={{ span: 12, offset: 2 }}
                        // style={{ minWidth: '400px', textAlign: 'center' }}
                    >
                        <CardGroup>
                            {renderWeeklyTemps}
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
   
}

export default DisplayWeather

// const handleWeeklyTemps = props.weeklyWeather.map((day) => {
//     return (
//     <div key={day.dt_txt}>{day.main.temp}</div>
//     )
// })