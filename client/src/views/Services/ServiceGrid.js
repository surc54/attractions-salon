import React, { useState } from "react";
import { makeStyles, Grid, Paper } from "@material-ui/core";

import ServiceWindow from "./ServiceWindow";
import SideBar from "./SideBar";
import "./Services.css";

const useStyles = makeStyles(theme => ({
    window: {
        paddingTop: 64,
    },
    container: {
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

const ServiceGrid = ({ services }) => {
    const [filterCat, setFilterCat] = useState("");
    const [filterText, setFilterText] = useState("");
    const [filterData, setFilterData] = useState(services);
    const classes = useStyles();
    {/**afdgdfbdfdbfd */}
    return (
        <div className={classes.window}>
            <Grid container spacing={0} className={classes.container}>
                <Grid item xs={12} md={2}>
                    <Paper className={classes.sideBar} elevation={0}>
                        <SideBar
                            services={services}
                            filterCat={filterCat}
                            filterText={filterText}
                            setFilterCat={setFilterCat}
                            setFilterText={setFilterText}
                            setFilterData={setFilterData}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Paper className={classes.serviceWindow} elevation={0}>
                        <ServiceWindow
                            services={services}
                            filterCat={filterCat}
                            filterText={filterText}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
export default ServiceGrid;
