import React, { useState } from "react";
import {
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import Rating from "@material-ui/lab/Rating";

const validate = (values) => {
    const errors = {};
    const requiredFields = ["name", "rating", "feedback"];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    return errors;
};

const AddTestimonial = (props) => {
    const [open, setOpen] = useState(false);
    const [formState, setAddForm] = useState({
        name: "",
        rating: "0",
        feedback: "",
    });

    const { handleSubmit, pristine, reset, submitting } = props;

    const handleChange = (e) => {
        setAddForm({
            ...formState,
            [e.target.name]: e.target.value,
        });
        // console.log(formState);
    };

    const renderTextField = ({
        input,
        label,
        meta: { touched, error },
        ...custom
    }) => (
        <TextField
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
        />
    );

    const renderRating = ({ input, ...rest }) => (
        <Rating
            {...input}
            {...rest}
            valueSelected={input.value}
            onChange={(event, value) => input.onChange(value)}
        />
    );

    // const handleSubmit = (e) => {
    //     // if (formState.name !== "" && formState.code !== "") {
    //     const data = {
    //         name: formState.name,
    //         rating: formState.rating,
    //         feedback: formState.feedback,
    //     };
    //     // };
    //     console.log(data);
    //     handleClose();
    //     e.preventDefault();
    // };

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
                <form>
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
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Field
                                        name="name"
                                        autoFocus
                                        label="Name"
                                        variant="outlined"
                                        margin="normal"
                                        component={renderTextField}
                                    />
                                </div>
                                <Typography>
                                    How would you rate your experience?
                                </Typography>
                                <div>
                                    <Field
                                        name="rating"
                                        value={parseInt(formState.rating)}
                                        onChange={handleChange}
                                        className="ratings"
                                        size="large"
                                        style={{ marginBottom: "20px" }}
                                        component={renderRating}
                                    />
                                </div>
                                <div>
                                    <Typography>
                                        Have some feedback? You can write it
                                        here:
                                    </Typography>
                                </div>
                                <div>
                                    <Field
                                        name="feedback"
                                        fullWidth
                                        variant="outlined"
                                        component={renderTextField}
                                        label="Write Your feedback Here"
                                        multiLine={true}
                                        margin="normal"
                                        rows={8}
                                    />
                                </div>
                            </form>
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
                        >
                            Submit
                        </Button>
                        <Button
                            type="button"
                            disabled={pristine || submitting}
                            onClick={reset}
                        >
                            Clear Values
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default reduxForm({
    form: "AddTestimonialForm", // a unique identifier for this form
    validate,
    // asyncValidate
})(AddTestimonial);
