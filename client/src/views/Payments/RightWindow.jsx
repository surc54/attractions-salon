import React from "react";
import { makeStyles, TextField, Button, ButtonBase } from "@material-ui/core";
import "./Payments.css";
import PayPalButton from "./PayPalButton";
import PaypalLogo from "./images/Paypal-Logo.png";
import SquareLogo from "./images/Square-Logo.png";

const RightWindow = props => {
    const inStyle = useStyles();

    return (
        <div className="bigDiv">
            <h2 style={{ marginTop: "0px" }}>Pay Now</h2>

            <p>
                <b>Please enter your Booking Number:</b>
            </p>

            <TextField
                id="outlined-basic"
                label="Booking Number"
                variant="outlined"
            />
            <p style={{ marginTop: "0px" }}>
                <b>
                    Or if you have an account: <a>Login</a>
                </b>
            </p>

            <p>
                <b>Select your prefered Payment Method</b>
            </p>

            <div className="paymentButtons">
                <ButtonBase className={inStyle.customButton}>
                    <span>Pay with</span>
                    <span style={{ width: "5px" }} />
                    <img
                        src={PaypalLogo}
                        alt="Paypal"
                        className={inStyle.img}
                    ></img>
                </ButtonBase>
                <ButtonBase className={inStyle.customButton}>
                    <span>Pay with</span>
                    <img
                        src={SquareLogo}
                        alt="Square"
                        className={inStyle.img}
                    ></img>
                </ButtonBase>
            </div>

            <p>
                <b>See your order - Pay when you arrive</b>
            </p>
            <div className="paymentButtons">
                <Button variant="outlined" className={inStyle.button}>
                    Pay when you arrive
                </Button>
            </div>

            <div style={{ position: "absolute", bottom: "0" }}>
                <b style={{ display: "block" }}>
                    Don't have an Appointment Number?
                </b>

                <b style={{ display: "block" }}>
                    Click here to shop for services and book an appointment
                </b>
            </div>
        </div>
    );
};

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
    customButton: {
        display: "flex",
        width: "50%",
        height: "40px",
        background: "#ffc439",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
    },
    img: {
        width: "40%",
    },
    empty: {
        width: "auto", // just to have something here
        height: "50rem",
    },
}));

export default RightWindow;
