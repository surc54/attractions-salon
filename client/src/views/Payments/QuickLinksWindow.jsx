import React from "react";
import { Typography, Link } from "@material-ui/core";
import "./Payments.css";

const QuickLinksWindow = props => {
    const preventDefault = event => event.preventDefault();
    return (
        <div className="quickLinksWindow">
            <h2 className="page2Title">Quick Links</h2>
            <a className="quickLinks" href="#">Cancel your appointment</a>
            <br></br>
            <a className="quickLinks" href="./Book">How does scheduling work?</a>
            <br></br>
            <a className="quickLinks" href="..">Where will my appointment take place?</a>
            <br></br>
            <a className="quickLinks" href="..">Call Attractions Salon</a>
        </div >
    );
};

export default QuickLinksWindow;

//Where do we direct users to when they want to cancel the appointment?