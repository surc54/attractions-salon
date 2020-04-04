import React from "react";
import {
    makeStyles,
    TextField,
    Button,
    ButtonBase,
    Divider,
} from "@material-ui/core";
import "./Payments.css";

const useStyles = makeStyles({
    verticalDivider: {
        margin: "8px",
    },
});

const RightWindow = () => {
    const classes = useStyles();

    return (
        <div className="bigDiv">
            <div className="titleInitialPage">
                Log in to see your appointment status
            </div>

            <div
                style={{
                    display: "flex",
                    height: "60%",
                    padding: "8px",
                    justifyContent: "space-around",
                }}
            >
                <div style={{ width: "70%", textAlign: "center" }}>
                    <h4>Please enter your Booking Number:</h4>

                    <TextField
                        label="Booking Number"
                        variant="outlined"
                        style={{ marginLeft: "5px" }}
                    />
                </div>

                <Divider
                    orientation="vertical"
                    flexItem
                    classes={{ root: classes.root }}
                />

                <div style={{ width: "70%", textAlign: "center" }}>
                    <h4>Or use your account information:</h4>

                    <TextField
                        label="Email"
                        variant="outlined"
                        style={{ marginBottom: "5px", marginLeft: "5px" }}
                    />
                    <br />
                    <TextField
                        label="Password"
                        variant="outlined"
                        style={{ marginLeft: "5px" }}
                    />
                </div>
            </div>

            <div className="titleInitialPage2">
                Don't have an Appointment Number?{" "}
                <a className="servicesLink" href="./Services">
                    Click here to shop for services and book an appointment
                </a>
            </div>
        </div>
    );
};

export default RightWindow;
