import { ADD_TESTIMONIAL } from "../actions/types";
import { TestimonialState, TestimonialTypes } from "../models/Testimonials";
import axios from "axios";
import { v4 as uuid } from "uuid";

const INITIAL_STATE: TestimonialState = {
    data: [],
};

function testimonialReducer(
    state = INITIAL_STATE,
    action: TestimonialTypes
): TestimonialState {
    switch (action.type) {
        case ADD_TESTIMONIAL: {
            const tempId = uuid();
            state = {
                ...state,
                data: [
                    {
                        id: tempId,
                        approved: false,
                        name: action.payload.name,
                        rating: parseInt(action.payload.rating),
                        feedback: action.payload.feedback,
                    },
                    ...state.data,
                ],
            };

            axios
                .post("/api/testimonial", {
                    id: tempId,
                    approved: false,
                    name: action.payload.name,
                    rating: parseInt(action.payload.rating),
                    feedback: action.payload.feedback,
                })
                .then(function (res) {
                    console.log(res.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

            return state;
        }
        default:
            return state;
    }
}

export default testimonialReducer;
