import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import "./Payments.css";
import PayPalButton from "./PayPalButton";
import PaypalLogo from "./images/Paypal-Logo.png"
import SquareLogo from "./images/Square-Logo.png"

const useStyles = makeStyles(theme => ({
    paypalButton: {
        width: "50%",
        height: "40px",
        minHeight: "40px",
        background: "#ffc439",
        maxHeight: "40px",
        color: "blue",
    },
    squareButton: {
        width: "50%",
        height: "40px",
        minHeight: "40px",
        background: "#000000",
        maxHeight: "40px",
        color: "white",
    },
    button: {
        width: "50%",
        height: "40px",
        minHeight: "40px",
        maxHeight: "40px",
        color: "black",
    },
    customButton:{
        display:"flex",
        width: "50%",
        height: "40px",
        background: "#ffc439",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
    },
    img:{
        width: "40%",
    },
    empty: {
        width: "auto", // just to have something here
        height: "50rem",
    },
}));

const images = [
    {
      url: '/images/Paypal-Logo.png',
      title: 'Paypal',
      width: '40%',
    },
    {
        url: '/images/Square-Logo.png',
        title: 'Square',
        width: '40%',
    },
]

const RightWindow = props => {
    const inStyle = useStyles();

    return (
        <div className="bigDiv">
            <h2>Pay Now</h2>
            <p>
                <b>Enter your Booking Number</b>
            </p>
            <TextField
                id="outlined-basic"
                label="Booking Number"
                variant="outlined"
            />

            <p>
                <b>Select your Payment Method</b>
            </p>

            <div className="paymentButtons">
                {/*<PayPalButton inStyle={inStyle.button} />*/}
                <div role="button" className={inStyle.customButton}>
                    <span>Pay with</span>
                    <img src={PaypalLogo} alt="Paypal" className={inStyle.img}></img>
                </div>
                <div role="button" className={inStyle.customButton}>
                    <span>Pay with</span>
                    <img src={SquareLogo} alt="Square" className={inStyle.img}></img>
                </div>
            </div>

            <p>
                <b>Confirm your appointment - Pay when you arrive</b>
            </p>
            <div className="paymentButtons">
                <Button variant="outlined" className={inStyle.button}>
                    Pay when you arrive
                </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="spacerDiv"></div>
            </div>
            <div className="questionDiv">
                <p>
                    <b>Don't have an Appointment Number?</b>
                </p>
                <p>
                    <b>
                        Click here to shop for services and book an appointment
                    </b>
                </p>
            </div>
        </div>
    );
};

export default RightWindow;
