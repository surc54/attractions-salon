import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
        marginTop: 70,
    },
    option: {
        width: 400,
        height: 170,
        marginTop: 5,
    },
    optionAll: {
        width: 325,
        height: 340,
        marginTop: 5,
    },
}));

export default function SpacingGrid() {
    const [spacing, setSpacing] = React.useState(5);
    const classes = useStyles();

    const handleChange = event => {
        setSpacing(Number(event.target.value));
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    <Grid key={1} item>
                        <Paper className={classes.option} />
                        <Paper className={classes.option} />
                    </Grid>

                    <Grid key={2} item>
                        <Paper className={classes.option} />
                        <Paper className={classes.option} />
                    </Grid>

                    <Grid key={3} item>
                        <Paper className={classes.optionAll} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}


    /*
<Grid item xs={12}>
<Paper className={classes.control}>
<Grid container>
<Grid item>
    <FormLabel>spacing</FormLabel>
</Grid>
</Grid>
</Paper>
</Grid>
    */



    /*
    import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

                   <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={handleChange}
                row
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={value.toString()}
                  />
                ))}
              </RadioGroup>
                  */

