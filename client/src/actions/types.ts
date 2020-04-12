// enum ActionTypes_old {
//     GET_AUTH_INFO_START,
//     GET_AUTH_INFO_END,
// }

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import User from "../models/User";
import { ReduxState } from "../reducers";

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

export type ThAction<A extends Action<any>> = ThunkAction<
    void,
    ReduxState,
    unknown,
    A
>;

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

export const ADD_TESTIMONIAL = 'ADD_TESTIMONIAL';
