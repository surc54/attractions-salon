import { Container, Grid } from "@material-ui/core";
import React from "react";
import Rectangle from "react-rectangle";
import { Link } from "react-router-dom";
import logo from "../../assets/attractions_salon_logo1.jpg";
import homepic from "../../assets/attractions_salon_photo.jpeg";

// This "styles" object is the only way to set styles from
// your scss file now (because of modularity)
import styles from "./Home.module.scss";

import SpacingGrid from "./SpacingGrid";
import SpacingGrid2 from "./SpacingGrid2";

const defaultProps = {
    center: { lat: 29.6728, lng: -82.39131 },
    zoom: 12,
};

// Changed this to an ES6 function
const Home = () => {
    return (
        <div className="App">
            <div>
                <header className="App-header">
                    <img src={homepic} className="salon-bkgrnd" alt="logo" />
                    <h2 className="homeH2">
                        Beautiful hair with beautiful care
                    </h2>
                    <linearGradient className="lingrad"></linearGradient>
                    <linearGradient className="rect"></linearGradient>
                    <Link to="/book">
                        <button className="booton">Book Now</button>
                    </Link>
                </header>
            </div>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                <div style={{ top: "100%", minHeight: "100vh" }}>
                    <about-header className="about-header">
                        <div style={{ height: "50px" }}>
                            <Grid item h3 className="about">
                                About Us
                            </Grid>
                        </div>
                        <img src={logo} className="logo2" alt="logo2" />
                        <Container className="about-body">
                            <p>
                                Lorem ipsum dolor sit amet, consectetuer
                                adipiscing elit. Aenean commodo ligula eget
                                dolor. Aenean massa strong. Cum sociis natoque
                                penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Donec quam felis,
                                ultricies nec, pellentesque eu, pretium quis,
                                sem.
                            </p>
                        </Container>
                        <Rectangle className="sliderr">
                            <p
                                style={{
                                    fontSize: "25px",
                                    fontFamily: "arial",
                                    color: "white",
                                }}
                            >
                                Slideshow
                            </p>
                        </Rectangle>
                    </about-header>
                </div>
            </Grid>
            <stylists className="stylist-header">
                <h4 className="stylists-title">Our Stylists</h4>
                <SpacingGrid className="stylist1"></SpacingGrid>
                <SpacingGrid2 className="stylist-box">Jane Doe</SpacingGrid2>
            </stylists>
            <div style={{ height: "60vh" }}>
                <location-header className="location-header">
                    <h4 className="location-title">Visit Us</h4>
                    <h5 className="loc-title2">Get in Touch</h5>
                    <Container className="loc-text">
                        <p>4509 NW 23 Ave, Gainesville, FL 32606</p>
                        <p className="loc-text2">
                            <b>Phone:</b> (352) 376-6008
                        </p>
                    </Container>
                    <iframe
                        className="map"
                        width="600"
                        height="450"
                        frameborder="0"
                        style={{
                            border: 0,
                            bottom: 40,
                            top: "-20vh",
                            right: -250,
                            padding: 40,
                        }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.590252296763!2d-82.393560285099!3d29.673662342947903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e8bb527c8cb42d%3A0x1a9ff37664975788!2sAttractions%20Salon!5e0!3m2!1sen!2sus!4v1583782909156!5m2!1sen!2sus"
                        allowfullscreen
                    ></iframe>
                </location-header>
                <Rectangle className="footer"></Rectangle>
            </div>
        </div>
    );
};

export default Home;
