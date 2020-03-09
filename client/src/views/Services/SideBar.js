import React from "react";

import { Button, makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

import "./Services.css";

const useStyles = makeStyles(theme => ({
    options: {
        alignItems: "flex-start",
        display: "contents",
        marginLeft: 5,
        paddingBottom: 5,
    },
    title: {
        marginLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
}));

const SideBar = props => {
    const classes = useStyles();
    return (
        <div>
            <div className="SideBar">
                <div className="titleBox">
                    <FormControlLabel
                        className="SideBarTitle"
                        value="???"
                        control={
                            <Button className="checkBoxes" size="small">
                                Clear
                            </Button>
                        }
                        label="Filter by:"
                        labelPlacement="start"
                        classes={{ root: classes.title }}
                    />
                </div>

                <div>
                    <TextField
                        id="search"
                        label="Search services here"
                        variant="filled"
                        autoComplete="off"
                        value={props.filterText}
                        /*onChange={event => {
                            props.setFilterText(event.target.value);
                        }}*/
                        style={{ width: "100%" }}
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className="checkBoxName"
                        value="???"
                        classes={{ root: classes.options }}
                        control={
                            <Checkbox
                                color="secondary"
                                className="checkBoxes"
                            />
                        }
                        label="Hair Care"
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className="checkBoxName"
                        value="???"
                        control={<Checkbox color="secondary" />}
                        label="Haircuts"
                        classes={{ root: classes.options }}
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className="checkBoxName"
                        value="???"
                        control={<Checkbox color="secondary" />}
                        label="Nail care"
                        classes={{ root: classes.options }}
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className="checkBoxName"
                        value="???"
                        control={<Checkbox color="secondary" />}
                        label="Hair Extensions"
                        classes={{ root: classes.options }}
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className="checkBoxName"
                        value="???"
                        control={<Checkbox color="secondary" />}
                        label="Waxing"
                        classes={{ root: classes.options }}
                    />
                </div>
                <div>
                    <Button
                        key={"Book an appointment"}
                        variant="contained"
                        color="primary"
                        style={{width: "100%", }}
                    >
                        Book an appointment
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default SideBar;
