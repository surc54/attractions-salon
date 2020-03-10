import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../assets/logo.svg';

//import homepic from '../../assets/attractions_salon_photo.jpeg';
import './Payments.css';
import { Header, Container, Card, Segment, Input, Image, Button} from 'semantic-ui-react';
import Rectangle from 'react-rectangle';
import {useHistory, useLocation} from "react-router-dom";

function Payments() {
    return (
        <div className = 'Payments'>
            <Rectangle className = 'topRectangle'></Rectangle>
            <div align = 'center' className = 'inputBox'>
                <Card fluid centered color = 'pink' >
                    <Card.Content>
                        <Container textAlign = 'left'>
                            <Header as = 'h2'>Pay Now</Header>
                            <Card.Description><font size = '3'>Enter your booking number</font></Card.Description>
                            <Card.Description><Input size = 'mini' focus placeholder = "Booking Number"></Input></Card.Description>
                            <Card.Description><font size = '3'>Select your Payment Method</font></Card.Description>
                            {/* <img src="square-picture.jpg" alt="Simply Easy Learning" width="200" height="80"/> */}
                            <Segment.Group horizontal>
                                <Segment>Square button</Segment>
                                <Segment>Paypal button</Segment>
                                <Segment>CashApp button</Segment>
                            </Segment.Group>
                            <Button>Confirm your appointment - Pay when you arrive</Button>
                        </Container>
                        
                        {/* <Card.Header>{'Pay Now'}</Card.Header>
                        <Card.Description>Enter Your Booking Number</Card.Description>
                        <Card.Description><Input focus placeholder = "Booking Number"></Input></Card.Description> */}
                    </Card.Content>
                    <Card.Content extra textAlign = 'left'> 
                        <font size = "2">
                            Don't have an appointment number? Click here to shop for services and book an appointment
                        </font>
                    </Card.Content>
                </Card>  
            </div>
            
            <Rectangle className = "bigBottomRectangle"></Rectangle>
            <Rectangle className = "bottomRectangle1"></Rectangle>
            <Rectangle className = "bottomRectangle2"></Rectangle>

            <linearGradient className = 'lingrad'></linearGradient>
            <linearGradient className = 'rect'></linearGradient>

            <Header as = 'h5' className = "Sitemap">Sitemap</Header>
            <Header as = 'h5' className = "credit">Attractions Salon © 2020</Header>
        </div>
    );
}

export default Payments;
