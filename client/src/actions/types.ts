// enum ActionTypes_old {
//     GET_AUTH_INFO_START,
//     GET_AUTH_INFO_END,
// }

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import User from "../models/User";
import { TestimonialData as Testimonial } from "../models/Testimonials";
import { ReduxState } from "../reducers";
import { addTestimonial } from "./_addTestimonial";

// export default ActionTypes_old;

// export interface Payload {
//     GET_AUTH_INFO_START: undefined | null;
//     GET_AUTH_INFO_END: {
//         error?: any;
//         signedIn?: boolean;
//         user?: User | null;
//     };
//     AUTH_LOGOUT_END: {
//         error?: any;
//     };
// }

export const GET_AUTH_INFO_START = "GET_AUTH_INFO_START";
export interface GetAuthInfoStart {
    type: typeof GET_AUTH_INFO_START;
    payload?: undefined;
}

export const GET_AUTH_INFO_END = "GET_AUTH_INFO_END";
export interface GetAuthInfoEnd {
    type: typeof GET_AUTH_INFO_END;
    payload: {
        error?: any;
        signedIn?: boolean;
        user?: User | null;
    };
}

export const AUTH_LOGOUT_END = "AUTH_LOGOUT_END";
export interface AuthLogoutEnd {
    type: typeof AUTH_LOGOUT_END;
    payload?: {
        error?: any;
    };
}

export const AUTH_SIGNUP_END = "AUTH_SIGNUP_END";
export interface AuthSignUpEnd {
    type: typeof AUTH_SIGNUP_END;
    payload?: {
        error?: any;
    };
}

// Admin user settings

export const ADMIN_USER_START = "ADMIN_USER_START";
export interface AdminUserStart {
    type: typeof ADMIN_USER_START;
}

export const ADMIN_USER_STOP = "ADMIN_USER_STOP";
export interface AdminUserStop {
    type: typeof ADMIN_USER_STOP;
}

export const ADMIN_USER_ERROR = "ADMIN_USER_ERROR";
export interface AdminUserError {
    type: typeof ADMIN_USER_ERROR;
    payload: any;
}

export const ADMIN_USER_UPDATE_LIST = "ADMIN_USER_UPDATE_LIST";
export interface AdminUserUpdateList {
    type: typeof ADMIN_USER_UPDATE_LIST;
    payload: User[];
}

export const ADMIN_USER_UPDATE_ONE = "ADMIN_USER_UPDATE_ONE";
export interface AdminUserUpdateOne {
    type: typeof ADMIN_USER_UPDATE_ONE;
    payload: User;
}

export const ADMIN_USER_DELETE_ONE = "ADMIN_USER_DELETE_ONE";
export interface AdminUserDeleteOne {
    type: typeof ADMIN_USER_DELETE_ONE;
    payload: string;
}

export const ADMIN_USER_UPDATE_QUERY = "ADMIN_USER_UPDATE_QUERY";
export interface AdminUserUpdateQuery {
    type: typeof ADMIN_USER_UPDATE_QUERY;
    payload: any;
}

export const ADMIN_USER_ADD_LOADED_PAGE = "ADMIN_USER_ADD_LOADED_PAGE";
export interface AdminUserAddLoadedPage {
    type: typeof ADMIN_USER_ADD_LOADED_PAGE;
    payload: number;
}

export const ADMIN_USER_SET_COUNT = "ADMIN_USER_SET_COUNT";
export interface AdminUserSetCount {
    type: typeof ADMIN_USER_SET_COUNT;
    payload: number;
}

export const ADMIN_USER_ADD_PAGE = "ADMIN_USER_ADD_PAGE";
export interface AdminUserAddPage {
    type: typeof ADMIN_USER_ADD_PAGE;
    payload: {
        users: User[];
        count: number;
        page: number;
    };
}

// ADMIN TESTIMONIAL PAGE

export const ADMIN_TESTIMONIAL_START = "ADMIN_TESTIMONIAL_START";
export interface AdminTestimonialStart {
    type: typeof ADMIN_TESTIMONIAL_START;
}

export const ADMIN_TESTIMONIAL_STOP = "ADMIN_TESTIMONIAL_STOP";
export interface AdminTestimonialStop {
    type: typeof ADMIN_TESTIMONIAL_STOP;
}

export const ADMIN_TESTIMONIALS_GET_LIST = "ADMIN_TESTIMONIALS_GET_LIST";
export interface adminTestimonialGetList {
    type: typeof ADMIN_TESTIMONIALS_GET_LIST;
    payload: any;
}

export const ADMIN_TESTIMONIAL_ERROR = "ADMIN_TESTIMONIAL_ERROR";
export interface AdminTestimonialError {
    type: typeof ADMIN_TESTIMONIAL_ERROR;
    payload: any;
}

export const ADMIN_TESTIMONIAL_UPDATE_LIST = "ADMIN_TESTIMONIAL_UPDATE_LIST";
export interface AdminTestimonialUpdateList {
    type: typeof ADMIN_TESTIMONIAL_UPDATE_LIST;
    payload: Testimonial[];
}

// export const ADMIN_TESTIMONIAL_UPDATE_ONE = "ADMIN_TESTIMONIAL_UPDATE_ONE";
// export interface AdminTestimonialUpdateOne {
//     type: typeof ADMIN_TESTIMONIAL_UPDATE_ONE;
//     payload: Testimonial;
// }

export const ADMIN_TESTIMONIAL_DELETE_ONE = "ADMIN_TESTIMONIAL_DELETE_ONE";
export interface AdminTestimonialDeleteOne {
    type: typeof ADMIN_TESTIMONIAL_DELETE_ONE;
    payload: string;
}

// export type Type = keyof Payload;

// export interface Action<T extends Type> {
//     type: T;
//     payload?: Payload[T];
// }

export interface ActionCallback {
    then?: () => void;
    catch?: (err?: any) => void;
    // finally?: () => void;
}

export type UserActions =
    | GetAuthInfoStart
    | GetAuthInfoEnd
    | AuthLogoutEnd
    | AuthSignUpEnd;

export type TestimonialActions = AddTestimonial;

export type AdminUserSettingsActions =
    | AdminUserStart
    | AdminUserStop
    | AdminUserUpdateList
    | AdminUserUpdateOne
    | AdminUserDeleteOne
    | AdminUserUpdateQuery
    | AdminUserError
    | AdminUserAddLoadedPage
    | AdminUserSetCount
    | AdminUserAddPage;

export type AdminTestimonialSettingsActions =
    | AdminTestimonialStart
    | AdminTestimonialStop
    | AdminTestimonialUpdateList
    | AdminTestimonialDeleteOne
    | adminTestimonialGetList
    | AdminTestimonialError;

export type ThAction<A extends Action<any>> = ThunkAction<
    void,
    ReduxState,
    unknown,
    A
>;

export class NonSuccessError extends Error {
    response: any;

    constructor(x: any) {
        super(x);
        this.response = x;
        this.message = "";
    }
}

// export interface Action extends GenericAction<"GET_AUTH_INFO_START"> {
//     payload?: undefined | null;
// }

// export interface Action extends GenericAction<"GET_AUTH_INFO_END"> {
//     payload?: undefined | null;
// }

// type Actio = Action<keyof Payload>;

// const f: Actio = {
//     type: "GET_AUTH_INFO_END",
//     payload: undefined,
// };

// interface ActionPayloads {
//     [ActionTypes_old.GET_AUTH_INFO_START]: undefined;
//     [ActionTypes_old.GET_AUTH_INFO_END]: {
//         error: string;
//     };
// }

// interface Action_old<T extends { [P in ActionTypes_old]: any }, D extends keyof T> {
//     type: D;
//     payload: T[D];
// }

// type Meme<T extends keyof ActionPayloads> = Action_old<ActionPayloads, T>;

// const f: Meme<ActionTypes_old.GET_AUTH_INFO_END> = {
//     type: ActionTypes_old.GET_AUTH_INFO_END,
//     payload: {
//         error: ""
//     }
// };

export const ADD_TESTIMONIAL = "ADD_TESTIMONIAL";

export interface AddTestimonial {
    type: typeof ADD_TESTIMONIAL;
    payload: any;
}
