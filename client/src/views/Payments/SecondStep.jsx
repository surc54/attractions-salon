import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import AppointmentWindow from "./AppointmentWindow";
import QuickLinksWindow from "./QuickLinksWindow";
import AmountDueWindow from "./AmountDueWindow";

const useStyles = makeStyles(theme => ({
    page2: {
        justifyContent: "center",
        //height: "48rem",
        //height: "48rem",
    },
}));

const SecondStep = ({ appointment }) => {
    const classes = useStyles();
    return (
        <div>
            <p style={{textAlign:"center", fontSize:15}}>Booking Number:</p>
            <p style={{textAlign:"center", fontSize:40, lineHeight:"0px"}}><strong>{appointment.bookingNum}</strong></p>
            <Grid container classes={{ container: classes.page2 }}>
                {/** use soemthing else to make it more responsive */}
                <Grid item xs={4} spacing={1} style={{ marginRight: "60px" }}>
                    <Paper elevation={1} className="p2Paper">
                        <AppointmentWindow appointment={appointment} />
                    </Paper>
                </Grid>
                <Grid item xs={4} spacing={1}>
                    <Paper elevation={1} className="p2Paper">
                        <AmountDueWindow appointment={appointment} />
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

/*
Pay with square takes you to 3rd step
*/