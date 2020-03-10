import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: "30%",
    border: "1px solid rgba(0, 0, 0, 0.17)",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
  },
  media: {
    height: 140,
  },
});

const MediaCard = (props) => {
  const classes = useStyles();

  let img = new Image();

  fetch("https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg")
  .then(response => response.blob())
  .then((myBlob) => {
  let objectURL = URL.createObjectURL(myBlob);
  img.src = objectURL;
  });

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
          title="pexels-photo-973403"
          height="140"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}


const ServiceWindow = (props) => {
    return (
        <div className="empty">
            <MediaCard services={props.services}/>
        </div>
    );
}
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