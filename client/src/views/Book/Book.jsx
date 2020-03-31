import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import "./Book.css";

const Book = props => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    
    return (
        <div className="content">
            <Typography color="primary" variant="h4" className="title">
                Book an Appointment
            </Typography>
            <form noValidate>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Phone"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time picker"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Book;