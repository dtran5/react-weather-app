import React from 'react';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';



const DisplayWeather = (props) => {

   
    const renderTemp = () => {
        if(props.city) {
            return (
                // <div className="container">
                //     <div className="cards">
                //         <h2>{city}</h2>
                //         <h5 className="py-4">
                //             <i className="wi wi-day-sunny display-4"></i>
                //         </h5>
                //         <h1 className="py-2">{currentTemp}&deg;</h1>
                //         <h3>
                //             <span className="px-4">{dailyLow}&deg;</span>
                //             <span className="px-4">{dailyMax}&deg;</span>
                //         </h3>
                //     </div>
                // </div>
                <Row style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                    <Col 
                        xs={{ span: 12 }}
                        sm={{ span: 8, offset: 2 }}
                        md={{ span: 6, offset: 3 }}
                        lg={{ span: 4, offset: 4 }}
                        style={{ minWidth: '400px' }}
                    >
                        <Card className="bg-transparent border-0" style={{ width: '100%', marginTop: '3rem' }}>
                            <Card.Img variant="top"/>
                            <Card.Body>
                                <Card.Title className="text-center text-white">{props.city}</Card.Title>
                                <Card.Title className="text-center text-white">
                                <h5 className="py-4">
                                   <i className={`${props.icon}`}></i>
                                </h5>
                                <h1 className="py-2">{props.currentTemp}&deg;F</h1>
                                <h4 style={{ marginBottom: '1rem' }}>
                                    <span className="px-4 h6">{props.dailyLow}&deg;F</span>
                                    <span className="px-4 h6">{props.dailyMax}&deg;F</span>
                                </h4>
                                <h5>{props.description}</h5>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            );
        }
    }
    

    return (
        <div>{renderTemp()}</div>
    )
   
}

export default DisplayWeather