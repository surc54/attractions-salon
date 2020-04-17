export interface TestimonialData {
    _id: string;
    id: string;
    approved: boolean;
    name: string;
    rating: number;
    feedback: string;
    createdAt: string;
    updatedAt: string;
}

export interface TestimonialState {
    data: TestimonialData[];
}

export interface TestimonialAction {
    type: string;
    payload: any;
}

export type TestimonialTypes = TestimonialAction;
