import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";

import AppointmentWindow from "./AppointmentWindow";
import QuickLinksWindow from "./QuickLinksWindow";
import AmountDueWindow from "./AmountDueWindow";

const useStyles = makeStyles(theme => ({

}));

const SecondStep = props => {
    const classes = useStyles();
    return (
        <Grid container spacing={2} justify="space-evenly" direction="row">
            <Grid item xs={4}>
                <Paper className={classes.paper} elevation={1}>
                    <AppointmentWindow />
                </Paper>
            </Grid>
            <Grid container alignItems="flex-end" spacing={2} justify="center">
                <Grid item xs={4}>
                    <Paper className={classes.paper} elevation={1}>
                        <AmountDueWindow />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} elevation={1}>
                        <QuickLinksWindow />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SecondStep;
