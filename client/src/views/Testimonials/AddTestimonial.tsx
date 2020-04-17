import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "./Form";
import { addTestimonial } from "../../actions/_addTestimonial";
import { reset } from "redux-form";

export const User = (props: any) => {
    const handleSubmit = (values: any) => {
        // console.log("values", values);
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
