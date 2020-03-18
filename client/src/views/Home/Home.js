import React from 'react';
import ReactDOM from 'react-dom'
import homepic from '../../assets/attractions_salon_photo.jpeg';
import logo from '../../assets/attractions_salon_logo1.jpg';
import './Home.css';
import { Link } from 'react-router-dom'
import {Modal, Button, Form, Icon, Image, Container} from 'semantic-ui-react'
import Rectangle from 'react-rectangle';

const defaultProps = {
    center: {lat: 29.672800, lng: -82.391310}, 
    zoom: 12
 }

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={homepic} className="salon-bkgrnd" alt="logo" />
                <h2 className="homeH2">
                    Beautiful hair with beautiful care
                </h2>
                <linearGradient className = 'lingrad'></linearGradient>
                <linearGradient className = 'rect'></linearGradient>
                <Link to='/book'><Button className = 'booton'>Book Now</Button></Link>
            </header>

            <div>
            <about-header className = 'about-header'>
                <h3 className = 'about'>About Us</h3>
                <img src={logo} className="logo2" alt="logo2" />
                <Container className = 'about-body'><p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                ultricies nec, pellentesque eu, pretium quis, sem. 
                </p>
                </Container>
                <Rectangle className = 'sliderr'><p style ={{fontSize: '25px', fontFamily: 'arial', color: 'white'}}>Slideshow</p></Rectangle>
            </about-header>
            </div>
            <stylists className = 'stylist-header'>
                <h4 className = 'stylists-title'>Our Stylists</h4>
                <Rectangle className = 'stylist1' 
                style = {{left: -310}}></Rectangle>
                <Rectangle className = 'stylist1' 
                style = {{left: -10, top: 470}}></Rectangle>
                <Rectangle className = 'stylist1' 
                style = {{left: 290, top: 220}}></Rectangle>
                <Container className = 'stylist-box' 
                style = {{top: 1996, left: 280}}>
                    Jane Doe</Container>
                <Container className = 'stylist-box' 
                style = {{top: 1996, left: 580}}>
                    Jane Doe II</Container> 
                <Container className = 'stylist-box' 
                style = {{top: 1996, left: 880}}>
                    Jane Doe III</Container>        
            </stylists>  

            <div>
            <location-header className = 'location-header'>
            <h4 className = 'location-title'>Visit Us</h4>
            <h5 className = 'loc-title2'>Get in Touch</h5>
            <Container className = 'loc-text'><p>
                4509 NW 23 Ave, Gainesville, FL 32606</p>
                <p className = 'loc-text2'><b>Phone:</b> (352) 376-6008
                </p></Container>
            <iframe className = 'map' width="600" height="450" frameborder="0" 
            style={{border:0, bottom: 40, top:2250, right: 100, padding: 40}} 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.590252296763!2d-82.393560285099!3d29.673662342947903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e8bb527c8cb42d%3A0x1a9ff37664975788!2sAttractions%20Salon!5e0!3m2!1sen!2sus!4v1583782909156!5m2!1sen!2sus" 
            allowfullscreen></iframe>
            <Rectangle className = 'footer'></Rectangle>    
            </location-header>
            </div>

        </div>
    );
}

export default Home;
