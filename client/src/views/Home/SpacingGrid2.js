import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from "./Home.module.scss";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 250,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(5);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {[0].map(value => (
            <Grid key={value} item>
              <Paper/><div style = {{top: '-35%', fontSize: 25}}
              className={styles["stylist-box"]}>{props.stylist1Name}
              <p><small>
                A small bio here</small></p>
              </div>
            </Grid>
          ))}
          {[1].map(value => (
            <Grid key={value} item>
              <Paper/><div style = {{top: '-35%', fontSize: 25}}
              className={styles["stylist-box"]}>Stylist 2
              <p><small>
                A small bio here</small></p>
                </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  );
}