import React from "react";
import {
    makeStyles,
    Button,
    ButtonBase,
    List,
    ListItem,
    ListItemText,
    Divider,
    Collapse,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import "./Payments.css";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },

    root: {
        backGroundColor: "white",
        borderRadius: "10px",
        width: "25%",
    },
    "btn-Cancelled": {
        backGroundColor: "white",
        border: "2px solid red",
        color: "red",
    },
    "btn-Pending": {
        backGroundColor: "white",
        border: "2px solid red",
        color: "red",
        borderRadius: "10px",
        width: "25%",
    },
    "btn-Scheduled": {
        backGroundColor: "white",
        border: "2px solid #79e827",
        color: "#79e827",
        borderRadius: "10px",
        width: "25%",

    },
    "btn-Completed": {
        backGroundColor: "white",
        border: "2px solid #79e827",
        color: "#79e827",
        borderRadius: "10px",
        width: "25%",
    },
    "btn-Past Due": {
        backGroundColor: "white",
        border: "2px solid red",
        color: "red",
        borderRadius: "10px",
        width: "25%",
    },
    scheduleButton: {
        border: "1px solid",
        backGroundColor: "white",
        borderColor: "#79E827",
        color: "#79e827",
        color: "#79E827",
    },
}));

const AppointmentWindow = props => {
    const classes = useStyles();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateString = days[props.appointment.date.getDay()] + ", " + months[props.appointment.date.getMonth()] + " " + props.appointment.date.getDate()
        + ", " + props.appointment.date.getFullYear();
    return (
        <div className="appointmentWindow">
            <div className="paperHeader">
                <div>
                    <h2 className="page2Title">Appointment Information</h2>
                    <p style={{ margin: "0" }}>{dateString}</p>
                </div>
                <Button classes={{
                    root: classes["btn-" + props.appointment.status]
                }} styles={ {backGroundColor: "white", borderRadius: "10px", width: "25%"}} size="small" variant="outlined">
                    {props.appointment.status}
                </Button>
            </div>

            <h4>Scheduled Items</h4>
            {props.appointment.services.map(service => {
                return (
                    <div className="appointmentInfoDiv" key={service.name}>
                        {service.name}
                        <div style={{ float: "right" }}>${service.price}</div>
                    </div>
                );
            })}

        </div>
    );
};

export default AppointmentWindow;
