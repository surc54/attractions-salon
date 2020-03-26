import React from "react";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import "./Payments.css";
import RightWindow from "./RightWindow";
import AppointmentWindow from "./AppointmentWindow";
import QuickLinksWindow from "./QuickLinksWindow";
import AmountDueWindow from "./AmountDueWindow";

const useStyles = makeStyles(theme => ({
    window: {
        height: "100%",
        marginTop: "7rem",
        display: "flex",
        justifyContent: "center",
    },
    empty: {
        width: "auto", // just to have something here
        height: "50rem",
    },
}));

const Payments = props => {
    const classes = useStyles();
    return (
        <div className="Payments">

            <Grid container spacing={1} className={classes.window}>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.empty} elevation={1}>
                        <RightWindow />
                    </Paper>
                </Grid>
            </Grid>

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




        </div>
    );
};

export default Payments;
