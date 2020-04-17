import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@material-ui/core";

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

const MediaCard = ({ services, filterText, filterCat }) => {
    const classes = useStyles();

    return (
        <div className="serviceEntries">
            {services
                .filter(item => item.name.toLowerCase().includes(filterText))
                .map(item => {
                    return (
                        <Card classes={{ root: classes.root }} key={item.name}>
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
                                                {item.groupName}
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
                })} {/**afdgdfbdfdbfd */}
        </div>
    );
};

const ServiceWindow = ({ services, filterText, filterCat }) => {
    return (
        <div className="empty">
            <MediaCard
                services={services}
                filterText={filterText}
                filterCat={filterCat}
            />
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
