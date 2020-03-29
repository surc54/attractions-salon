import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import LogInWindow from "./LogInWindow";

const useStyles = makeStyles(theme => ({
    window: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    empty: {
        width: "auto",
    },
}));

const FirstStep = props => {
    const classes = useStyles();
    return (
        <Grid container spacing={1} className={classes.window}>
            <Grid item xs={12} md={4}>
                <Paper className={classes.empty} elevation={1}>
                    <LogInWindow />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default FirstStep;
