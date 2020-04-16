import { ADD_TESTIMONIAL } from "../actions/types";
import { TestimonialState, TestimonialTypes } from "../models/Testimonials";

const INITIAL_STATE: TestimonialState = {
    data: [],
};

function testimonialReducer(
    state = INITIAL_STATE,
    action: TestimonialTypes
): TestimonialState {
    switch (action.type) {
        case ADD_TESTIMONIAL: {
            state = {
                ...state,
                data: [
                    {
                        id: action.payload.id,
                        approved: false,
                        name: action.payload.name,
                        rating: parseInt(action.payload.rating),
                        feedback: action.payload.feedback,
                    },
                    ...state.data,
                ],
            };

            return state;
        }
        default:
            return state;
    }
}

export default testimonialReducer;
