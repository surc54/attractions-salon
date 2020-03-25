import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import "./Payments.css";
import PayPalButton from "./PayPalButton";

const RightWindow = props => {
    return (
        <div className = "bigDiv">
            <h2>Pay Now</h2>
            <p><b>Enter your Booking Number</b></p>
            <TextField id="outlined-basic" label="Booking Number" variant="outlined" />
            <p><b>Select your Payment Method</b></p>
            <div  className = "paymentButtons">
                <PayPalButton className = "paypalButton"/>
                <Button variant="outlined" color="primary" className = "squareButton">Square</Button>
            </div>
            <p><b>Just confirm your appointment - Pay when you arrive</b></p>
            <Button variant = "outlined">Pay when you arrive</Button>

            <div style = {{display: "flex", flexDirection: "column"}}><div className = "spacerDiv"></div></div>
            <div className = "questionDiv">
                <p><b>Don't have an Appointment Number?</b></p>
                <p><b>Click here to shop for services and book an appointment</b></p>
            </div>
        </div>
    );
};

export default RightWindow;