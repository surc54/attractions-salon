import React from "react";

import {
    Button,
    makeStyles,
    Checkbox,
    Collapse,
    FormControlLabel,
    Typography,
    List,
    ListItem,
    Chip,
    ListItemText,
} from "@material-ui/core";

import clsx from "clsx";

import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { Link } from "react-router-dom";

import { useServices } from "../../hooks";

import "./Services.css";

const SideBar = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState({
        "Hair Care": false,
        "Nail Care": false,
        "Hair extensions": false,
        "Hair Cuts": false,
        Waxing: false,
    });

    const handleChange = (event) => {
        // setChecked(false);
        setChecked({ ...checked, [event.target.name]: event.target.checked });
        if (event.target.checked === true)
            props.setFilterCat(event.target.name);
        else if (event.target.checked === false) props.setFilterCat("");
    };

    const clearChecks = () => {
        setChecked({
            "Hair Care": false,
            "Nail Care": false,
            "Hair extensions": false,
            "Hair Cuts": false,
            Waxing: false,
        });
    };

    return (
        <div>
            <div className="SideBar">
                <div className="titleBox">
                    <div className={classes.sidebarHeader}>
                        <Typography variant="button">
                            Filter Services
                        </Typography>
                        <span className="spacer" />
                        <Button
                            className="clearButton"
                            size="small"
                            color="primary"
                            style={{ float: "right" }}
                            onClick={() => {
                                props.setFilterText("");
                                props.setFilterCat("");
                                clearChecks();
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                    {/* <FormControlLabel
                        className="SideBarTitle"
                        control={
                            <Button
                                className="clearButton"
                                size="small"
                                style={{ float: "right" }}
                                onClick={() => {
                                    props.setFilterText("");
                                    props.setFilterCat("");
                                    clearChecks();
                                }}
                            >
                                Clear
                            </Button>
                        }
                        label="Filter by:"
                        labelPlacement="start"
                        classes={{ root: classes.title }}
                    /> */}
                </div>

                <div>
                    <input
                        id="search"
                        className={classes.searchBox}
                        placeholder="Type here to search"
                        type="text"
                        autoComplete="off"
                        value={props.filterText}
                        onChange={(e) =>
                            props.setFilterText(e.target.value.toLowerCase())
                        }
                        style={{ width: "100%" }}
                    />
                    {/* <TextField
                        id="search"
                        label="Search services here"
                        variant="filled"
                        autoComplete="off"
                        value={props.filterText}
                        onChange={(event) => {
                            props.setFilterText(
                                event.target.value.toLowerCase()
                            );
                        }}
                        style={{ width: "100%" }}
                    /> */}
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        label="Hair Care"
                        className={clsx("checkBoxName", {
                            [classes.selectedCheckbox]: checked["Hair Care"],
                        })}
                        classes={{ root: classes.options }}
                        control={
                            <Checkbox
                                color="secondary"
                                name="Hair Care"
                                checked={checked["Hair Care"]}
                                onChange={handleChange}
                            />
                        }
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        label="Haircuts"
                        className={clsx("checkBoxName", {
                            [classes.selectedCheckbox]: checked["Hair Cuts"],
                        })}
                        control={
                            <Checkbox
                                name="Hair Cuts"
                                color="secondary"
                                checked={checked["Hair Cuts"]}
                                onChange={handleChange}
                            />
                        }
                        classes={{ root: classes.options }}
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className={clsx("checkBoxName", {
                            [classes.selectedCheckbox]: checked["Nail Care"],
                        })}
                        control={
                            <Checkbox
                                name="Nail Care"
                                color="secondary"
                                checked={checked["Nail Care"]}
                                onChange={handleChange}
                            />
                        }
                        label="Nail care"
                        classes={{ root: classes.options }}
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className={clsx("checkBoxName", {
                            [classes.selectedCheckbox]:
                                checked["Hair extensions"],
                        })}
                        control={
                            <Checkbox
                                name="Hair extensions"
                                color="secondary"
                                checked={checked["Hair extensions"]}
                                onChange={handleChange}
                            />
                        }
                        label="Hair Extensions"
                        classes={{ root: classes.options }}
                    />
                </div>

                <div className="itemBox">
                    <FormControlLabel
                        className={clsx("checkBoxName", {
                            [classes.selectedCheckbox]: checked["Waxing"],
                        })}
                        control={
                            <Checkbox
                                name="Waxing"
                                color="secondary"
                                checked={checked.Waxing}
                                onChange={handleChange}
                            />
                        }
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
                    component={Link}
                    to={"/book"}
                >
                    Request an appointment
                </Button>
                <CartList cart={props.cart} setCart={props.setCart} />
            </div>
        </div>
    );
};
/////////////// {cart, setCart}
const CartList = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const servicesHook = useServices();

    //limit to 3, cause it looks ok with just 3 -not

    const handleClick = () => {
        setOpen(!open);
    };

    const inCart = servicesHook.services.filter((service) => service.inCart);

    return (
        <List component="nav" className={classes.root} disablePadding>
            <ListItem button onClick={handleClick} className="itemClass">
                <ShoppingCartIcon
                    style={{ marginRight: "10px", color: "pink" }}
                />
                <ListItemText primary="Your Cart" />

                <Chip
                    label={String(inCart.length)}
                    size="small"
                    style={{ marginRight: 12 }}
                    color={inCart.length > 0 ? "primary" : "default"}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {inCart.map((service) => {
                        return (
                            <ListItem>
                                <ListItemText primary={service.name} />$
                                {service.price}
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
};

const useStyles = makeStyles((theme) => ({
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
    searchBox: {
        height: 64,
        background: "rgba(0, 0, 0, 0.05)",
        border: "none",
        outline: "none",
        color: "rgba(0, 0, 0, 0.75)",
        paddingLeft: 14,
        paddingRight: 14,
    },
    sidebarHeader: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "6px 14px",
    },
    selectedCheckbox: {
        color: theme.palette.primary.main,
    },
}));

export default SideBar;
