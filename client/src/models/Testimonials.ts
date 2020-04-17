export interface TestimonialData {
    approved: boolean;
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
