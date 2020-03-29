import React from "react";
import { makeStyles, TextField, Button, ButtonBase, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import "./Payments.css";

const useStyles1 = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },

    scheduleButton: {
        border: '1px solid',
        backGroundColor: 'white',
        borderColor: '#79E827',
        color: '#79E827',
    },
}));

const AppointmentWindow = props => {
    const classes = useStyles1();
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    }
    const handleClick1 = () => {
        setOpen(!open);
    }

    return (
        <div className="appointmentWindow">
            <h2 style={{ marginTop: "0px" }}>Appointment</h2>
            <Button className={"scheduleButton"} variant="outlined" >Scheduled</Button>
            <p>March 28, 2020 at 2:30 PM</p>
            <h4>Scheduled Items</h4>
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemText>
                        Full Highlight
                    </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                Full Highlight info
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClick1}>
                    <ListItemText>
                        Full Highlight 2
                    </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                Full Highlight 2 info
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={handleClick}>
                    <ListItemText>
                        Full Highlight 3
                    </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText>
                                Full Highlight 3 info
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default AppointmentWindow;