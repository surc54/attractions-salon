import React, { useState } from "react";
import { makeStyles, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./Services.css";

import ServiceWindow from "./ServiceWindow";
import SideBar from "./SideBar";

const useStyles = makeStyles(theme => ({
    window: {
        paddingTop: 64,
    },
    container:{
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    sideBar: {
        height: "auto",
        marginTop: 5,
    },
    serviceWindow: {
        height: "600px",
        marginTop: 5,
        overflow: "auto",
        scrollBehavior: "smooth",
    },
}));

const ServiceGrid = ({services}) => {
    const [filterText, setFilterText] = useState("");
    const [filterData, setFilterData] = useState(services)
    const classes = useStyles();

    return (
        <div className={classes.window}>

            <Grid container spacing={0} className={classes.container}>
            <Grid item xs={12} md={2}>
                <Paper className={classes.sideBar} elevation={0}>
                    <SideBar 
                        filterText={filterText}
                        setFilterText={setFilterText}
                        filterData={filterData}
                        setFilterData={setFilterData}
                    />
                </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
                <Paper className={classes.serviceWindow} elevation={0}>
                    <ServiceWindow services={services} />
                </Paper>
            </Grid>
            </Grid>
        </div>
    );
};
export default ServiceGrid;
