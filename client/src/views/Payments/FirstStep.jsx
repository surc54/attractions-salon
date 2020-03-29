import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import LogInWindow from "./LogInWindow";

const useStyles = makeStyles(theme => ({
    window: {
        height: "48rem",
        display: "flex",
        justifyContent: "center",
    },
    empty: {
        width: "auto",
        height: "100%"
    },
}));

const FirstStep = props => {
    const classes = useStyles();
    return (
        <Grid container className={classes.window}>
            <Grid item xs={12} md={8}>
                <Paper className={classes.empty} elevation={1}>
                    <LogInWindow />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default FirstStep;
