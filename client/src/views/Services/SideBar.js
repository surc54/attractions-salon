import React from "react";

import { Button, makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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
        display: "flex",
        justifyContent: "space-between",
        marginRight: "5px",
    },
    root: {
        border: "1px solid rgba(0, 0, 0, 0.17)",
        borderRadius: "5px",
    },
}));

const SideBar = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className="SideBar">
                <div className="titleBox">
                    <FormControlLabel
                        className="SideBarTitle"
                        value="???"
                        control={
                            <Button
                                className="clearButton"
                                size="small"
                                style={{ float: "right" }}
                                onClick={() => {
                                    props.setFilterText("");
                                    props.setFilterCat("");
                                }}
                            >
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
                        onChange={event => {
                            props.setFilterText(event.target.value);

                            // props.setFilterData(
                            //     props.services.filter(item =>
                            //         item.name.includes(event.target.value)
                            //     )
                            // );
                        }}
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
                {/**afdgdfbdfdbfd */}

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
            </div>
            <div>
                <Button
                    key={"Request an appointment"}
                    variant="contained"
                    color="primary"
                    style={{ width: "100%", marginTop: 15, marginBottom: 20 }}
                >
                    Request an appointment
                </Button>
                <CartList />
            </div>
        </div>
    );
};

const CartList = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cart, setCart] = React.useState([]);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List component="nav" className={classes.root} disablePadding>
            <ListItem button onClick={handleClick} className="itemClass">
                <ListItemText primary="Your Cart" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {cart.map(service => {
                        return (
                            <ListItem>
                                <ListItemText primary="filler" />
                                <ListItemIcon></ListItemIcon>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
};
export default SideBar;
