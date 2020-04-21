import React from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import "./Book.css";
import axios from 'axios';

const Book = props => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Booking submitted! Check your phone for your booking number.");
        axios.post(`https://pure-crag-64431.herokuapp.com/api/booking/`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    };
    
    return (
        <div className="content">
            <form noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography color="primary" variant="h4" style={styles.title}>
                            Book an Appointment
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Name"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
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
                                label="Select date"
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
                                label="Select time"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        key={"Request an appointment"}
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

const styles = {
    title: {
        fontFamily: "Pacifico, sans-serif",
        display: "inline-block"
    }
};

export default Book;