import { Reducer } from "redux";
import User from "../models/User";
import { UserActions, GetAuthInfoEnd, AuthLogoutEnd } from "../actions/types";

const INIT: UserState = {
    loading: true,
    user: null,
    signedIn: false,
    error: null,
};

const reducer: Reducer<UserState, UserActions> = (state = INIT, action) => {
    switch (action.type) {
        case "GET_AUTH_INFO_START": {
            return { ...state, loading: true };
        }
        case "GET_AUTH_INFO_END": {
            const { payload } = <GetAuthInfoEnd>action;
            return {
                ...state,
                loading: false,
                error: payload?.error,
                signedIn: payload?.signedIn || state.signedIn,
                user: payload?.user,
            };
        }
        case "AUTH_LOGOUT_END": {
            const { payload } = <AuthLogoutEnd>action;
            return {
                ...state,
                loading: false,
                signedIn: false,
                user: null,
                error: payload?.error,
            };
        }
        default:
            return state;
    }
};

export default reducer;

export interface UserState {
    loading: boolean;
    error?: any | null;
    signedIn: boolean;
    user?: User | null;
}
