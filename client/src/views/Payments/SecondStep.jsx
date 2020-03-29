import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import AppointmentWindow from "./AppointmentWindow";
import QuickLinksWindow from "./QuickLinksWindow";
import AmountDueWindow from "./AmountDueWindow";

const useStyles = makeStyles(theme => ({
    page2: {
        justifyContent: "center", 
        height: "48rem",
    },
}));

const SecondStep = props => {
    const classes = useStyles();
    return (
        <Grid container classes={{container: classes.page2}}>
            {/**            use soemthing else to make it more responsive */}
            <Grid item xs={4} spacing={1} style={{marginRight: "60px"}}>
                <Paper elevation={1} className="p2Paper">
                    <AppointmentWindow />
                </Paper>
            </Grid>
            <Grid item xs={4} spacing={1}>
                <Paper elevation={1} className="p2Paper">
                    <AmountDueWindow />
                </Paper>
                <Paper elevation={1} className="linkPaper">
                    <QuickLinksWindow />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SecondStep;
