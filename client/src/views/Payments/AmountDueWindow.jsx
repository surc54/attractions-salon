import React from "react";
import { makeStyles, Button, ButtonBase } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./Payments.css";
import SquareLogo from "./images/Square-Final.jpg";
import { Link } from 'react-router-dom';



const AmountDueWindow = props => {
    const inStyle = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="amountDueWindow">
            <div className="paperHeader">
                <h2 className="page2Title">Amount Due</h2>
                <ButtonBase className="scheduleButton">
                    <h2 style={{ margin: "4px" }}>${props.appointment.price}</h2>
                </ButtonBase>
            </div>

            <b>Choose your prefered payment method:</b>
            <div className="paymentButtons">
                {/* <ButtonBase className={inStyle.squareButton}>
                    <span>Pay with</span>
                    <img
                        src={SquareLogo}
                        alt="Square"
                        className={inStyle.img}
                    ></img>
                </ButtonBase> */}
                {/* <Button className={inStyle.squareButton}>
                    <span>Pay with</span>
                    <img
                        src={SquareLogo2}
                        className={inStyle.img}
                    />
                </Button> */}
                <ButtonBase className={inStyle.squareButton}>
                    <img
                        src={SquareLogo}
                        className={inStyle.img}
                    ></img>
                </ButtonBase>
                <ButtonBase className={inStyle.customButton} onClick={handleClickOpen}>
                    {/* <Link className="arrivalButton" to="./">Pay when you arrive</Link> */}
                    <p className="arrivalButton" to="./">Pay when you arrive</p>
                </ButtonBase>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Thank you!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Thank you for booking with us. We'll see you in store!
                        </DialogContentText>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
                         </Button>
                    </DialogActions> */}
                </Dialog>
            </div>

            {/* <b>Or pay in-store</b>
            <div className="paymentButtons">
                <ButtonBase className={inStyle.customButton} >
                    <Link className="arrivalButton" to="./">Pay when you arrive</Link>
                </ButtonBase>
            </div> */}
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
    squareButton: {
        display: "flex",
        width: "40%",
        height: "60px",
        background: "black",
        width: "50%",
        height: "50px",
        //background: "#ffffff",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
        border: "solid black",
        background: "black",
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
        width: "40%",
        height: "60px",
        width: "50%",
        height: "50px",
        background: "#ffffff",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
        border: "solid black",
    },
    img: {
        width: "60%",
        height: "100%",
        imageRendering: "auto",
        //imageRendering: "pixelated",
        width: "50%",
        height: "100%",
        //imageRendering: "auto",
        //imageRendering: "crisp-edges",
        imageRendering: "pixelated",
    },
    empty: {
        width: "auto", // just to have something here
        height: "50rem",
    },
}));

export default AmountDueWindow;
