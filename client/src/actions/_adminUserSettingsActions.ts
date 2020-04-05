import axios from "../models/axios";
import Config from "../models/Config";
import { AdminUserList } from "../models/ResponseTypes";
import { axios_error } from "../tools";
import {
    ActionCallback,
    AdminUserError,
    AdminUserSettingsActions,
    AdminUserStart,
    AdminUserStop,
    AdminUserUpdateQuery,
    NonSuccessError,
    ThAction,
} from "./types";

const start: AdminUserStart = {
    type: "ADMIN_USER_START",
};

const stop: AdminUserStop = {
    type: "ADMIN_USER_STOP",
};

const error = (error: any): AdminUserError => ({
    type: "ADMIN_USER_ERROR",
    payload: error,
});

export const resetQuery = (
    newState?: any,
    callbacks: ActionCallback = {}
): ThAction<AdminUserUpdateQuery> => {
    return (dispatch, getState) => {
        let payload;
        if (newState) {
            payload = newState;
        } else {
            payload = {
                ...(getState().adminUserSettings.query || {}),
                __random: Math.random(),
            };
        }

        dispatch({
            type: "ADMIN_USER_UPDATE_QUERY",
            payload,
        });
        callbacks.then?.();
    };
};

export const getUsersList = (
    search?: string,
    page: number = 0,
    filter?: any,
    callbacks: ActionCallback = {}
): ThAction<AdminUserSettingsActions> => {
    return (dispatch, getState) => {
        dispatch(start);
        dispatch({
            type: "ADMIN_USER_UPDATE_QUERY",
            payload: { search, filter },
        });

        axios
            .request<AdminUserList>({
                ...Config.apiUrls["admin - get user list"],
                params: {
                    page,
                },
                data: {
                    search,
                    filter,
                },
            })
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error("Status code was not 200", resp);
                    throw new Error("Unexpected status code");
                }

                if (resp.data.code !== "admin/user/list/success") {
                    throw new NonSuccessError(resp);
                }

                if (resp.data.error) {
                    throw new NonSuccessError(resp);
                }

                if (!resp.data.data) {
                    throw new Error("Did not receive data (for user list)");
                }

                dispatch({
                    type: "ADMIN_USER_ADD_PAGE",
                    payload: {
                        users: resp.data.data,
                        count: resp.data.count || -1,
                        page: page,
                    },
                });

                // dispatch({
                //     type: "ADMIN_USER_ADD_LOADED_PAGE",
                //     payload: page,
                // });

                // dispatch({
                //     type: "ADMIN_USER_SET_COUNT",
                //     payload: resp.data.count || -1,
                // });

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
