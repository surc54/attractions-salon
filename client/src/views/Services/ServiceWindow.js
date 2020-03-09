import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 300,
    border: "1px solid rgba(0, 0, 0, 0.17)",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      className={classes.root}
    >
      <ListItem button onClick={handleClick} className="itemClass">
        <ListItemText primary="Highlights"/> 
        {/* primary = data.services.name*/}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>  
          {/* {} -> returns map of specific services in above */}
            <ListItemText primary="Partial Highlight $65" />
            <ListItemIcon>
                <InfoIcon />
                <AddIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button className={classes.nested}>  
          <ListItemText primary="Partial Highlight / Cut $80" />
            <ListItemIcon>
                <InfoIcon />
                <AddIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button className={classes.nested}>  
          <ListItemText primary="Full Highlight $85" />
            <ListItemIcon>
                <InfoIcon />
                <AddIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button className={classes.nested}>  
          <ListItemText primary="Full Highlight / Cut $100" />
            <ListItemIcon>
                <InfoIcon />
                <AddIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

const ServiceWindow = (props) => {
    return (
        <div className="empty">
            <NestedList/>
        </div>
    );
}
export default ServiceWindow;