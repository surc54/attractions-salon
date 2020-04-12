import React from "react";
import { connect } from "react-redux";
import Form from "./Form";
import { addTestimonial } from "../../actions/_addTestimonial";
import { reset } from "redux-form";

export const User = (props: any) => {
    const handleSubmit = (values: any) => {
        // console.log("values", values);
        props.dispatch(addTestimonial(values));
        props.dispatch(reset("addtestimonial"));
    };
    return <Form onSubmit={handleSubmit} {...props} />;
};

export default connect(null)(User);
