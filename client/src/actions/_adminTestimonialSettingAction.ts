import axios from "../models/axios";
import Config from "../models/Config";
import {
    AdminTestimonialDeleteResponse,
    // AdminTestimonialInfoResponse,
    AdminTestimonialListResponse,
    // AdminTestimonialUpdateResponse,
    // ApiResponseTestimonial,
} from "../models/ResponseTypes";
// import { TestimonialData as Testimonial } from "../models/Testimonials";
import { axios_error } from "../tools";
import {
    ActionCallback,
    AdminTestimonialError,
    AdminTestimonialSettingsActions,
    AdminTestimonialStart,
    AdminTestimonialStop,
    NonSuccessError,
    ThAction,
} from "./types";

const start: AdminTestimonialStart = {
    type: "ADMIN_TESTIMONIAL_START",
};

const stop: AdminTestimonialStop = {
    type: "ADMIN_TESTIMONIAL_STOP",
};

const error = (error: any): AdminTestimonialError => ({
    type: "ADMIN_TESTIMONIAL_ERROR",
    payload: error,
});

export const getTestimonialsList = (
    callbacks: ActionCallback = {}
): ThAction<AdminTestimonialSettingsActions> => {
    return (dispatch, getState) => {
        dispatch(start);

        axios
            .request<AdminTestimonialListResponse>({
                ...Config.apiUrls["admin - get testimonial list"],
            })
            .then((resp) => {

                if (resp.status !== 200) {
                    console.error("Status code was not 200", resp);
                    throw new Error("Unexpected status code");
                }

                if (resp.data.code !== "admin/testimonial/list/success") {
                    throw new NonSuccessError(resp);
                }

                if (resp.data.error) {
                    throw new NonSuccessError(resp);
                }

                if (!resp.data.data) {
                    throw new Error(
                        "Did not receive data (for testimonial list)"
                    );
                }

                dispatch({
                    type: "ADMIN_TESTIMONIALS_GET_LIST",
                    payload: {
                        data: resp.data.data,
                    },
                });

                callbacks?.then?.();
            })
            .catch((err) => {
                dispatch(error(axios_error(err)));

                callbacks?.catch?.({
                    message: axios_error(err),
                });
            })
            .finally(() => dispatch(stop));
    };
};

export const deleteTestimonial = (
    uid: string,
    callbacks?: ActionCallback
): ThAction<AdminTestimonialSettingsActions> => (dispatch, getState) => {
    dispatch(start);

    axios
        .request<AdminTestimonialDeleteResponse>({
            ...Config.apiUrls["admin - delete testimonial"],
            url: uid,
        })
        .then((resp) => {
            if (resp.status !== 200) {
                throw new NonSuccessError(resp);
            }

            if (resp.data.code !== "admin/testimonial/delete/success") {
                throw new NonSuccessError(resp);
            }

            dispatch({
                type: "ADMIN_TESTIMONIAL_DELETE_ONE",
                payload: resp.data?.data?.id as string,
            });

            callbacks?.then?.();
        })
        .catch((err) => {
            const msg = axios_error(err);

            dispatch(error(msg));

            callbacks?.catch?.({
                message: msg,
            });
        })
        .finally(() => dispatch(stop));
};
