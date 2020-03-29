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
                <div>
                    <h4>
                        Please enter your Booking Number:
                    </h4>

                    <TextField
                        label="Booking Number"
                        variant="outlined"
                        style={{marginLeft: "5px"}}
                    />
                </div>

                <Divider
                    orientation="vertical"
                    flexItem
                    classeName={{ root: classes.root }}
                />

                <div>
                    <h4>
                        Or use your account information:
                    </h4>

                    <TextField
                        label="Email"
                        variant="outlined"
                        style={{marginBottom: "5px", marginLeft: "5px"}}
                    />
                    <br/>
                    <TextField
                        label="Password"
                        variant="outlined"
                        style={{marginLeft: "5px"}}
                    />
                </div>
            </div>

            <div className="titleInitialPage">
                Don't have an Appointment Number? Click here to shop for
                services and book an appointment
            </div>
        </div>
    );
};

export default RightWindow;
