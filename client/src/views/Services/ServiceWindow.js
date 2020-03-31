import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        minWidth: "30%",
        border: "1px solid rgba(0, 0, 0, 0.17)",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        marginRight: "30px",
        marginBottom: "20px",
    },
    content: {
      paddingLeft: "8px",
  },
    media: {
        height: 140,
    },
});

const MediaCard = props => {
    const classes = useStyles();
    return(
      <div className="serviceEntries">
      {props.services.map(group => {
          return group.items.map(item => {
              return (
                  <Card classes={{ root: classes.root }}>
                      <CardActionArea>
                          <CardMedia
                              className={classes.media}
                              image={item.imgURL}
                              title={item.name}
                              height="165"
                          />
                          <CardContent>
                              <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="h2"
                              >
                                  {group.groupName} 
                              </Typography>
                              <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                              >
                                  {item.name}
                              </Typography>
                              <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                              >
                                  {item.subtitle}
                              </Typography>
                          </CardContent>
                      </CardActionArea>
                      <CardActions style={{ float: "right" }}>
                          <Button size="small" color="primary">
                              Learn More
                          </Button>
                          <Button size="small" color="secondary">
                              Add
                          </Button>
                      </CardActions>
                  </Card>
              );
          });
      })}
    </div>
      )
    
};

const ServiceWindow = props => {
    return (
        <div className="empty">
            <MediaCard services={props.services} />
        </div>
    );
};
export default ServiceWindow;

// function NestedList() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <List
//       component="nav"
//       className={classes.root}
//     >
//       <ListItem button onClick={handleClick} className="itemClass">
//         <ListItemText primary="Highlights"/>
//         {/* primary = data.services.name*/}
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItem>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItem button className={classes.nested}>
//           {/* {} -> returns map of specific services in above */}
//             <ListItemText primary="Partial Highlight $65" />
//             <ListItemIcon>
//                 <InfoIcon />
//                 <AddIcon />
//             </ListItemIcon>
//           </ListItem>
//           <ListItem button className={classes.nested}>
//           <ListItemText primary="Partial Highlight / Cut $80" />
//             <ListItemIcon>
//                 <InfoIcon />
//                 <AddIcon />
//             </ListItemIcon>
//           </ListItem>
//           <ListItem button className={classes.nested}>
//           <ListItemText primary="Full Highlight $85" />
//             <ListItemIcon>
//                 <InfoIcon />
//                 <AddIcon />
//             </ListItemIcon>
//           </ListItem>
//           <ListItem button className={classes.nested}>
//           <ListItemText primary="Full Highlight / Cut $100" />
//             <ListItemIcon>
//                 <InfoIcon />
//                 <AddIcon />
//             </ListItemIcon>
//           </ListItem>
//         </List>
//       </Collapse>
//     </List>
//   );
// }
