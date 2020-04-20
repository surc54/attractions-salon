import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./Book.css";
import { connect } from "react-redux";
import { reset } from "redux-form";
// import { bookNow } from "../../actions/_bookNow";
import { Field, reduxForm, FormErrors } from "redux-form";
import moment from "moment";

export interface bookNowParams {
    name: string;
    phone: number;
    date: Date | string;
    time: Date | string;
}

const validate = (values: bookNowParams): FormErrors<bookNowParams> => {
    const errors: FormErrors<bookNowParams> = {};
    if (!values.name) {
        errors.name = "Name required";
    }
    if (!values.phone) {
        errors.phone = "Phone required";
    }
    if (!values.date) {
        errors.date = "Date required";
    }
    if (!values.time) {
        errors.time = "Time required";
    }
    return errors;
};

const renderTextField: React.FC = (field: any) => {
    return (
        <div>
            <TextField
                variant={field.variant}
                autoFocus={field.autoFocus}
                margin={field.margin}
                label={field.label}
                fullWidth={field.fullWidth}
                required={field.required}
                id={field.id}
                {...field.input}
            />
            {field.meta.touched && (
                <p style={{ color: "red", margin: "0px" }}>
                    {field.meta.error}
                </p>
            )}
        </div>
    );
};

const renderKeyboardDatePicker = ({
    input,
    variant,
    id,
    margin,
    defaultValue,
    label,
    meta: { touched, error },
}: any) => (
    <div>
        <KeyboardDatePicker
            variant={variant}
            defaultValue={defaultValue}
            label={label}
            margin={margin}
            {...input}
            // id={id}
            format="MM/dd/yyyy"
            selected={input.value ? moment(input.value) : null}
        />
        {touched && <p style={{ color: "red", margin: "0px" }}>{error}</p>}
    </div>
);

//                 margin={field.margin}
//                 label={field.label}
//                 onChange={field.onChange}
// KeyboardButtonProps={field.KeyboardButtonProps}

const renderKeyboardTimePicker: React.FC = (field: any | Date) => {
    return (
        <div>
            <KeyboardTimePicker
                variant={field.variant}
                margin={field.margin}
                label={field.label}
                defaultValue={field.value || ""}
                onChange={field.onChange}
                // KeyboardButtonProps={field.KeyboardButtonProps}
                // id={field.id}
                {...field.input}
            />
            {field.meta.touched && (
                <p style={{ color: "red", margin: "0px" }}>
                    {field.meta.error}
                </p>
            )}
        </div>
    );
};

const Book = (props: any) => {
    const { pristine, submitting, open, setOpen } = props;

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleSubmit = (values: any) => {
        console.log(values);
        // props.dispatch(bookNow(values));
        // props.dispatch(reset("booknow"));
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            color="primary"
                            variant="h4"
                            style={styles.title}
                        >
                            Book an Appointment
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            required
                            id="outlined-required"
                            label="Name"
                            variant="outlined"
                            name="name"
                            component={renderTextField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            required
                            id="outlined-required"
                            label="Phone"
                            variant="outlined"
                            name="phone"
                            component={renderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <Field
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Select date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                    name="date"
                                    component={renderKeyboardDatePicker}
                                />
                                <Field
                                    margin="normal"
                                    id="time-picker"
                                    label="Select time"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change time",
                                    }}
                                    name="time"
                                    component={renderKeyboardTimePicker}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            key={"Request an appointment"}
                            variant="contained"
                            color="primary"
                            style={{
                                width: "100%",
                                marginTop: 15,
                                marginBottom: 20,
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

const styles = {
    title: {
        fontFamily: "Pacifico, sans-serif",
        display: "inline-block",
    },
};

const form = reduxForm({
    form: "booknow",
    validate,
})(Book);

export default connect(null)(form);
