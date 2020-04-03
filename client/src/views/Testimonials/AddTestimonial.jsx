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
import Rating from "@material-ui/lab/Rating";

const AddTestimonial = () => {
    const [open, setOpen] = useState(false);
    const [formState, setAddForm] = useState({
        name: "",
        rating: "0",
        feedback: "",
    });

    const handleChange = e => {
        setAddForm({
            ...formState,
            [e.target.name]: e.target.value,
        });
        // console.log(formState);
    };

    const handleSubmit = e => {
        // if (formState.name !== "" && formState.code !== "") {
        const data = {
            name: formState.name,
            rating: formState.rating,
            feedback: formState.feedback,
        };
        // };
        console.log(data);
        handleClose();
        e.preventDefault();
    };

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
                        <TextField
                            name="name"
                            autoFocus
                            label="Name"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={handleChange}
                        />
                        <Typography>
                            How would you rate your experience?
                        </Typography>
                        <Rating
                            name="rating"
                            value={parseInt(formState.rating)}
                            onChange={handleChange}
                            className="ratings"
                            size="large"
                            style={{ marginBottom: "20px" }}
                        />
                        <Typography>
                            Have some feedback? You can write it here:
                        </Typography>
                        <TextField
                            name="feedback"
                            multiline
                            label="Write Your feedback Here"
                            fullWidth
                            required
                            rows="8"
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
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
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTestimonial;
