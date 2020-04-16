import {
    ActionCallback,
    ADD_TESTIMONIAL,
    ThAction,
    TestimonialActions,
} from "./types";
import axios from "../models/axios";
import { v4 as uuid } from "uuid";

export const addTestimonial = (
    data: any,
    callbacks: ActionCallback = {}
): ThAction<TestimonialActions> => {
    const tempId = uuid();
    return (dispatch, getState) => {
        axios
            .post("/api/testimonial", {
                id: tempId,
                approved: false,
                name: data.name,
                rating: parseInt(data.rating),
                feedback: data.feedback,
            })
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error("Status code was not 200", resp);
                    throw new Error("Unexpected status code");
                }
                const { data } = resp;

                dispatch({
                    payload: data,
                    type: ADD_TESTIMONIAL,
                });

                callbacks?.then?.();
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
