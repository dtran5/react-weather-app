import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/displayWeather.css';
import '../assets/dist/wu-icons-style.css';


const DisplayWeather = (props) => {

    // const renderTemp = () => {
    //     if(props.city) {
    //         return (
    //             <div className="text-right">
    //                 <Card className='border-0 render-temp-card'>
    //                     <Card.Body>
    //                         <Card.Title className="text-center text-black">{props.city}</Card.Title>
    //                         <Card.Title className="text-center text-black">
    //                         <h1 className="py-2">{props.currentTemp}&deg;F</h1>
                            
    //                         <h5 className="text-capitalize">{props.description}</h5>
    //                         </Card.Title>
    //                     </Card.Body>
    //                 </Card>
    //             </div>
    //         );
    //     } 
    // }

    // const renderHighAndLow = () => {
    //     if (props.city) {
    //         return (
    //             <Card 
    //                 className="border-0 render-highandlow-card" 
                    
    //             >
    //                 <Card.Body>
    //                     <div className="text-center" style={{ color: 'black' }}>
    //                         <i className={`${props.icon} wu-64`}></i>
    //                         <h4 style={{ marginTop: '1rem' }}>
    //                             <span className="px-4 h6">{props.dailyLow}&deg;F</span>
    //                             <span className="px-4 h6">{props.dailyMax}&deg;F</span>
    //                         </h4>
    //                     </div>
    //                 </Card.Body>
    //             </Card>
    //         )
    //     }
    // }

    const renderTemp = () => {
        if (props.city) {
            return (
            <div className="render=temp-container">
                <Card className="text-center render-temp-card">
                    <Card.Header>{props.city}</Card.Header>
                    <Card.Body>
                    <Card.Title><i className={`${props.icon} wu-64`}></i></Card.Title>
                    <Card.Title>{props.currentTemp}</Card.Title>
                        <Card.Text className="text-capitalize">
                        {props.description}
                        </Card.Text>
                        <Card.Text>
                            <span className="px-4 h6">{props.dailyLow}&deg;F</span>
                            <span>/</span>
                            <span className="px-4 h6">{props.dailyMax}&deg;F</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
                
            )
        }
    }

    const renderWeeklyTemps = props.weeklyTemps.map((day) => {
        return (
            <div key={day.date}>
                <Card className="text-center weekly-temps-card mb-1">
                    <Card.Header>{day.date}</Card.Header>
                    <Card.Body>
                        <Card.Title><i className={`${day.icon}`}></i></Card.Title>
                        <Card.Text>{day.temp}&deg;F</Card.Text>
                        <Card.Text className="text-capitalize">
                            {day.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    })

    return (
        <div>
            <Container>
                <Row style={{ marginTop: '4rem' }}>
                    <Col
                        className="justify-content-center"
                        xs={{ span: 12, offset: 0 }}
                        sm={{ span: 12, offset: 0 }}
                        md={{ span: 8, offset: 2 }}
                        lg={{ span: 6, offset: 3 }}
                        xl={{ span: 6, offset: 3 }}  
                    >
                        {renderTemp()}
                        
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <CardGroup className="justify-content-center">
                            {renderWeeklyTemps}
                        </CardGroup>

                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
   
}

export default DisplayWeather

