import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import AppointmentWindow from "./AppointmentWindow";
import QuickLinksWindow from "./QuickLinksWindow";
import AmountDueWindow from "./AmountDueWindow";

const useStyles = makeStyles((theme) => ({
    page2: {
        justifyContent: "center",
        height: "39rem",
    },
}));

const SecondStep = ({ appointment, setActiveStep }) => {
    const classes = useStyles();
    return (
        <div>
            <p
                style={{
                    textAlign: "center",
                    fontSize: 15,
                    marginBottom: ".5em",
                }}
            >
                Booking Number:
            </p>
            <p
                style={{
                    textAlign: "center",
                    fontSize: 40,
                    lineHeight: "0px",
                    marginTop: ".5em",
                }}
            >
                <strong>{appointment.bookingNum}</strong>
            </p>
            <Grid container classes={{ container: classes.page2 }}>
                <Grid item xs={4} style={{ marginRight: "60px" }}>
                    <Paper elevation={1} className="p2Paper">
                        <AppointmentWindow appointment={appointment} />
                    </Paper>
                </Grid>
                <Grid item xs={4} >
                    <Paper elevation={1} className="p2Paper">
                        <AmountDueWindow appointment={appointment} setActiveStep={setActiveStep} />
                    </Paper>
                    <Paper elevation={1} className="linkPaper">
                        <QuickLinksWindow />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default SecondStep;
