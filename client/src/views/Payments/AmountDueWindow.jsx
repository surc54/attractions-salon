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
            <div className="paperHeader">
                <h2 className="page2Title">Amount Due</h2>
                <ButtonBase className="scheduleButton">
                    <h2 style={{margin: "4px"}}>$425.00</h2>
                </ButtonBase>
            </div>



            <b>Choose your prefered payment method:</b>
            <div className="paymentButtons">
                <ButtonBase className={inStyle.squareButton}>
                    <span>Pay with</span>
                    <img
                        src={SquareLogo}
                        alt="Square"
                        className={inStyle.img}
                    ></img>
                </ButtonBase>
            </div>

            <b>Or pay in-store</b>
            <div className="paymentButtons">
                <ButtonBase className={inStyle.customButton}>
                    <span>Pay when you arrive</span>
                </ButtonBase>
            </div>
        </div>
    );
};

/**
 * <ButtonBase className={inStyle.paypalButton}>
                    <span>Pay with</span>
                    <span style={{ width: "5px" }} />
                    <img
                        src={PaypalLogo}
                        alt="Paypal"
                        className={inStyle.img}
                    ></img>
    </ButtonBase>
 */

const useStyles = makeStyles(theme => ({
    paypalButton: {
        display: "flex",
        width: "50%",
        height: "40px",
        background: "#ffc439",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
    },
    squareButton: {
        display: "flex",
        width: "50%",
        height: "40px",
        background: "#ffffff",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
        border: "solid black",
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
        background: "#ffffff",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
        border: "solid black",
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
