import { ADD_TESTIMONIAL } from "./types";

export const addTestimonial = (data: any) => ({
    payload: data,
    type: ADD_TESTIMONIAL,
});
