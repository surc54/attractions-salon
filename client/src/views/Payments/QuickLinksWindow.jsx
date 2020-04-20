import React from "react";
import { Typography, Link } from "@material-ui/core";
import "./Payments.css";

const QuickLinksWindow = props => {
    const preventDefault = event => event.preventDefault();
    return (
        <div className="quickLinksWindow">
            <h2 className="page2Title">Quick Links</h2>
            <div className="quickLinksWindowDiv">
                <a className="quickLinks" href="./Book">Cancel your appointment</a>
            </div>
            <div className="quickLinksWindowDiv">
                <a className="quickLinks" href="./Book">How does scheduling work?</a>
            </div>
            <div className="quickLinksWindowDiv">
                <a className="quickLinks" href="..#contactSection">Where will my appointment take place?</a>
            </div>
            <div className="quickLinksWindowDiv">
                <a className="quickLinks" href="..#contactSection">Call Attractions Salon</a>
            </div>
        </div >
    );
};

export default QuickLinksWindow;

//Where do we direct users to when they want to cancel the appointment?