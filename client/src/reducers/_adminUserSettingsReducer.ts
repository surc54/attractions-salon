import { Reducer } from "redux";
import User from "../models/User";
import {
    UserActions,
    GetAuthInfoEnd,
    AuthLogoutEnd,
    AuthSignUpEnd,
    AdminUserSettingsActions,
} from "../actions/types";
import _ from "lodash";

const INIT: AdminUserSettingsState = {
    loading: true,
    users: [],
    error: null,
};

const reducer: Reducer<AdminUserSettingsState, AdminUserSettingsActions> = (
    state = INIT,
    action
) => {
    switch (action.type) {
        case "ADMIN_USER_START": {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case "ADMIN_USER_STOP": {
            return {
                ...state,
                loading: false,
            };
        }
        case "ADMIN_USER_UPDATE_LIST": {
            return {
                ...state,
                users: action.payload,
            };
        }
        case "ADMIN_USER_UPDATE_ONE": {
            const user = action.payload;

            return {
                ...state,
                users: [...state.users.filter((x) => x.id !== user.id), user],
            };
        }
        case "ADMIN_USER_DELETE_ONE": {
            return {
                ...state,
                users: state.users.filter((x) => x.id !== action.payload),
            };
        }
        case "ADMIN_USER_ERROR": {
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

export interface AdminUserSettingsState {
    loading: boolean;
    error?: any | null;
    users: User[];
}
