import React from "react";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import "./Payments.css";
import RightWindow from "./RightWindow";

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
            <div>
                <Grid container spacing={1} className={classes.window}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.empty} elevation={1}>
                            <RightWindow/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    );
};

export default Payments;
