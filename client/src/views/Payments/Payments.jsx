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
import RightWindow from "./RightWindow";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

const useStyles = makeStyles(theme => ({
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
    },
}));

const Payments = props => {
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

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <SecondStep />;
        case 1:
            return <FirstStep />;
        case 2:
            return "This is the bit I really care about!";
        default:
            return "Unknown stepIndex";
    }
}

const HorizontalLabelPositionBelowStepper = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed
                        </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "8px",
                            }}
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
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
    );
};
