import { ADD_TESTIMONIAL } from "../actions/types";
import { TestimonialState, TestimonialTypes } from "../actions/_addTestimonial";

const INITIAL_STATE: TestimonialState = {
    data: [],
};

function testimonialReducer(
    state = INITIAL_STATE,
    action: TestimonialTypes
): TestimonialState {
    switch (action.type) {
        case ADD_TESTIMONIAL: {
            return {
                ...state,
                data: [action.payload, ...state.data],
            };
        }
        default:
            return state;
    }
}

export default testimonialReducer;
