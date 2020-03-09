import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import './Services.css';

import ServiceWindow from "./ServiceWindow";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";

const useStyles = makeStyles(theme => ({
    window: {
        marginTop: 64,
    },
    root: {
        flexGrow: 1,
    },
    sideBar: {
        width: 250,
        height: "auto",
        marginTop: 5,
    },
    serviceWindow: {
        width: 1100,
        height: 500,
        marginTop: 5,
    },
}));

const ServiceGrid = (props) => {
    const [filterText, setFilterText] = useState('');
    const classes = useStyles();

    return (
        <div className={classes.window}>
            <SearchBar>
                filterText={filterText}
                setFilterText={setFilterText}
            </SearchBar>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={6}>
                        <Grid key={1} item>
                            <Paper className={classes.sideBar} elevation={0}>
                                <SideBar/>
                                  
                            </Paper>
                        </Grid>

                        <Grid key={2} item>
                            <Paper className={classes.serviceWindow}>
                                <ServiceWindow/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
export default ServiceGrid;