import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
} from "@material-ui/core";
import "./Payments.css";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

import bgImage1 from "./images/Rectangle1.png";
import bgImage2 from "./images/Rectangle2.png";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "60rem",
        paddingTop: "7rem",
        justifySelf: "center",
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        fontSize: 40,
    },
}));

const Payments = (props) => {
    const classes = useStyles();
    return <HorizontalLabelPositionBelowStepper />;
};

export default Payments;

function getSteps() {
    return [
        "Enter your booking information",
        "See your booking status",
        "Pay Online (optional)",
    ];
}

const appointment = {
    bookingNum: "CX4-BS2-7G9",
    status: "Pending",
    name: "Mars",
    date: new Date("December 17, 1995 03:24:00"), // let birthday = new Date(1995, 11, 17, 3, 24, 0);
    phone: "333-345-6879",
    price: 405,
    user: {
        name: "Mike Tyson",
        email: "miketyson@gmail.com",
        emailVerified: true,
        phone: "954-111-1111",
        password: "knockout",
        role: "Guest",
    },
    services: [
        {
            groupName: "Process Color",
            name: "Single Process Color",
            price: "55",
            description: "",
            imgURL: "",
        },
        {
            groupName: "Snack",
            name: "Chocolate Chip Donut",
            price: "350",
            description: "",
            imgURL: "",
        },
    ],
};

function getStepContent(stepIndex, setActiveStep) {
    switch (stepIndex) {
        case 0:
            return <FirstStep />;
        case 1:
            return <SecondStep appointment={appointment} setActiveStep={setActiveStep}/>;
        case 2:
            return <ThirdStep appointment={appointment} />;
        default:
            return "Unknown stepIndex";
    }
}

const HorizontalLabelPositionBelowStepper = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const [moveNext, setMoveNext] = React.useState({
        0: true,
        1: true,
        2: true,
    });

    const [moveBack, setMoveBack] = React.useState({
        0: false,
        1: false,
        2: true,
    });

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div style={{textAlign:"center"}}>
                            <Typography className={classes.instructions}>
                                All steps completed
                            </Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            {getStepContent(activeStep, setActiveStep)}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "8px",
                                }}
                            >
                                <Button
                                    disabled={!moveBack[activeStep]}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button
                                    disabled={!moveNext[activeStep]}
                                    onClick={handleNext}
                                    variant="contained"
                                    color="primary"
                                >
                                    {activeStep === steps.length - 1
                                        ? "Finish"
                                        : "Next"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <img
                src={bgImage1}
                style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    zIndex: "-1",
                }}
            />
            <img
                src={bgImage2}
                style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    zIndex: "-1",
                }}
            />
        </>
    );
};
