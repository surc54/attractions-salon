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
    padding: theme.spacing(5),
  },
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(5);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {[0].map(value => (
            <Grid key={0} item>
              <Paper className={styles["stylist1"]} />
            </Grid>
          ))}
          {[1].map(value => (
            <Grid key={1} item>
              <Paper className={styles["stylist2"]} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={6}>
      </Grid>
    </Grid>
  );
}