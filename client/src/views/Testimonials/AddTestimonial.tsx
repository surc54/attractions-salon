import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "./Form";
import { addTestimonial } from "../../actions/_addTestimonial";
import { reset } from "redux-form";

export const User = (props: any) => {
    const handleSubmit = (values: any) => {
        // console.log("values", values);
        // if (!recaptchaRef.current) {
        //     snack.enqueueSnackbar("ReCAPTCHA unavailable. Try again later.", {
        //         autoHideDuration: 5000,
        //     });
        //     return;
        // }

        // const token = recaptchaRef.current.getValue();

        // if (!token) {
        //     snack.enqueueSnackbar("ReCAPTCHA is required. Try again.", {
        //         autoHideDuration: 5000,
        //     });
        //     return;
        // }
        props.dispatch(addTestimonial(values));
        props.dispatch(reset("addtestimonial"));
        setOpen(false);
    };

    const [open, setOpen] = useState(false);

    return (
        <Form
            onSubmit={handleSubmit}
            setOpen={setOpen}
            open={open}
            {...props}
        />
    );
};

export default connect(null)(User);
