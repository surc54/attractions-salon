import _ from "lodash";
import { Reducer } from "redux";
import { AdminUserSettingsActions } from "../actions/types";
import User from "../models/User";

const INIT: AdminUserSettingsState = {
    loading: true,
    users: [],
    error: null,
    query: {
        search: "",
    },
    loadedPages: [],
    count: -1,
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
                loadedPages: [],
            };
        }
        case "ADMIN_USER_ADD_PAGE": {
            const { users, count, page } = action.payload;
            return {
                ...state,
                users: _.uniqBy([...state.users, ...users], "id"),
                count,
                loadedPages: _.uniq([...state.loadedPages, page]),
            };
        }
        case "ADMIN_USER_SET_COUNT": {
            return {
                ...state,
                count: action.payload,
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
        case "ADMIN_USER_UPDATE_QUERY": {
            if (state.query && _.isEqual(action.payload, state.query)) {
                return state;
            }

            return {
                ...state,
                users: [],
                query: action.payload,
                loadedPages: [],
                count: -1,
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
    query?: any;
    loadedPages: number[];
    count: number;
}
