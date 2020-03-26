import React from "react";
import { makeStyles, Button, ButtonBase } from "@material-ui/core";
import "./Payments.css";
import PayPalButton from "./PayPalButton";
import PaypalLogo from "./images/Paypal-Logo.png";
import SquareLogo from "./images/Square-Logo.png";

const AmountDueWindow = props => {
    const inStyle = useStyles();
    return (
        <div className="amountDueWindow">
            <h2>Amount Due</h2>
            <h1 className="amountDue">$420.00</h1>
            <p className="sentence"><b>Pay in advance</b></p>
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
            <p><b>Or pay in-store</b></p>
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

export default AmountDueWindow;