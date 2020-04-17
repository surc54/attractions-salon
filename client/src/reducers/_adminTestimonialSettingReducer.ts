import { Reducer } from "redux";
import { AdminTestimonialSettingsActions } from "../actions/types";
import { TestimonialData as Testimonial } from "../models/Testimonials";

const INIT: AdminTestimonialSettingsState = {
    loading: true,
    Testimonials: [],
    error: null,
    lastLoadTime: null,
    count: -1,
};

const reducer: Reducer<
    AdminTestimonialSettingsState,
    AdminTestimonialSettingsActions
> = (state = INIT, action) => {
    switch (action.type) {
        case "ADMIN_TESTIMONIAL_START": {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case "ADMIN_TESTIMONIAL_STOP": {
            return {
                ...state,
                loading: false,
            };
        }
        case "ADMIN_TESTIMONIAL_UPDATE_LIST": {
            const Testimonial = action.payload;
            return {
                ...state,
                Testimonials: state.Testimonials.map((x) =>
                    x.id === Testimonial.id ? Testimonial : x
                ),
            };
        }
        case "ADMIN_TESTIMONIALS_GET_LIST": {
            const { data } = action.payload;
            return {
                ...state,
                Testimonials: data,
                lastLoadTime: new Date(),
            };
        }
        case "ADMIN_TESTIMONIAL_DELETE_ONE": {
            return {
                ...state,
                Testimonials: state.Testimonials.filter(
                    (x) => x.id !== action.payload
                ),
                count: state.count - 1,
            };
        }
        case "ADMIN_TESTIMONIAL_ERROR": {
            return {
                ...state,
                error: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;

export interface AdminTestimonialSettingsState {
    loading: boolean;
    error?: any | null;
    Testimonials: Testimonial[];
    lastLoadTime: null | Date;
    count: number;
}
