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
        height: "fit-content",
        width: "24%",
        border: "1px solid rgba(0, 0, 0, 0.17)",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        marginRight: "10px",
        marginBottom: "20px",
    },
    content: {
        paddingLeft: "8px",
    },
    serviceGroup: {
        lineHeight: "1",
        fontSize: "1.6rem",
    },
    serviceTitle: {
        fontWeight: "600",
        fontSize: "2.1rem",
    },
    servicePrice: {
        fontWeight: "600",
        fontSize: "2.5rem",
        float: "right",
    },
    serviceStyle: {
        padding: "8px",
    },
    media: {
        height: 180,
    },
});

const MediaCard = props => {
    const classes = useStyles();
    return (
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
                                />
                                <CardContent className={classes.serviceStyle}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div>
                                            <Typography
                                                variant="h6"
                                                className={classes.serviceGroup}
                                            >
                                                {group.groupName}
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                className={classes.serviceTitle}
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {item.subtitle}
                                            </Typography>
                                        </div>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                            className={classes.servicePrice}
                                        >
                                            ${item.price}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                            <CardActions
                                style={{ float: "right", padding: "4px" }}
                            >
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
    );
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
