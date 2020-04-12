import React, { useState } from "react";
import { connect } from "react-redux";

import { FormErrors } from "redux-form";

import { Field, reduxForm } from "redux-form";
import {
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import "./Testimonials.css";

export interface addTestimonialParams {
    name: string;
    rating: number;
    feedback: string;
}

const validate = (
    values: addTestimonialParams
): FormErrors<addTestimonialParams> => {
    const errors: FormErrors<addTestimonialParams> = {};
    if (!values.name) {
        errors.name = "Name required";
    }
    if (!values.rating) {
        errors.rating = "Rating required";
    }
    if (!values.feedback) {
        errors.feedback = "Feedback required";
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
                disabled={field.disabled}
                fullWidth={field.fullWidth}
                multiline={field.multiline}
                rows={field.rows}
                {...field.input}
            />
            {field.meta.touched && (
                <p className="text-danger">{field.meta.error}</p>
            )}
        </div>
    );
};

export const Form: React.FC = (props: any) => {
    const { handleSubmit, pristine, submitting } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                className="button"
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Your Testimonial
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit} noValidate={true}>
                    <DialogContent className="modal">
                        <div
                            style={{
                                backgroundColor: "#E7A1AF",
                                height: "50px",
                            }}
                        >
                            <DialogContentText className="modal-title">
                                Please describe your experience
                            </DialogContentText>
                        </div>
                        <div style={{ margin: "0px 20px" }}>
                            <Field
                                name="name"
                                autoFocus
                                label="Name"
                                variant="outlined"
                                margin="normal"
                                component={renderTextField}
                            />
                            {/* <Typography>
                                How would you rate your experience?
                            </Typography>
                            <Field
                                name="rating"
                                // value={parseInt(formState.rating)}
                                // onChange={handleChange}
                                className="ratings"
                                size="large"
                                style={{ marginBottom: "20px" }}
                                component={Rating}
                            /> */}
                            <Typography>
                                Have some feedback? You can write it here:
                            </Typography>
                            <Field
                                name="feedback"
                                fullWidth
                                variant="outlined"
                                component={renderTextField}
                                label="Write Your feedback Here"
                                multiline
                                margin="normal"
                                rows={8}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ color: "white" }}
                            type="submit"
                            disabled={pristine || submitting}
                            onClick={handleClose}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

const form = reduxForm({
    form: "addtestimonial",
    validate,
})(Form);

export default connect(null)(form);
