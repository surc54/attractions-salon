import { ADD_TESTIMONIAL } from "./types";

export interface TestimonialData {
    name: string;
    rating: number;
    feedback: string;
}

export interface TestimonialState {
    data: TestimonialData[];
}

export interface TestimonialAction {
    type: string;
    payload: any;
}

export type TestimonialTypes = TestimonialAction;

export const addTestimonial = (data: any) => ({
    payload: data,
    type: ADD_TESTIMONIAL,
});
