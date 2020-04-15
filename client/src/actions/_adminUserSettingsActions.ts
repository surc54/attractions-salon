import axios from "../models/axios";
import Config from "../models/Config";
import {
    AdminUserDeleteResponse,
    AdminUserInfoResponse,
    AdminUserListResponse,
    AdminUserUpdateResponse,
    ApiResponseUser,
} from "../models/ResponseTypes";
import User from "../models/User";
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
import { getUserAuthInfo } from "./_loginActions";

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
            .request<AdminUserListResponse>({
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
                console.log(resp);
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

export const getUserInfo = (
    uid: string,
    callbacks?: ActionCallback
): ThAction<AdminUserSettingsActions> => (dispatch, getState) => {
    dispatch(start);

    axios
        .request<AdminUserInfoResponse>({
            ...Config.apiUrls["admin - get user"],
            url: uid,
        })
        .then((resp) => {
            if (resp.status !== 200) {
                throw new NonSuccessError(resp);
            }

            if (
                !resp.data ||
                resp.data.error ||
                resp.data.code !== "admin/user/info/success"
            ) {
                throw new NonSuccessError(resp);
            }

            if (
                getState().login.user?.id.toString() ===
                resp.data.data?._id.toString()
            ) {
                dispatch(getUserAuthInfo());
            }

            dispatch({
                type: "ADMIN_USER_UPDATE_ONE",
                payload: resp.data.data as ApiResponseUser,
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

export const updateUser = (
    uid: string,
    user: User,
    callbacks?: ActionCallback
): ThAction<AdminUserSettingsActions> => (dispatch, getState) => {
    dispatch(start);

    axios
        .request<AdminUserUpdateResponse>({
            ...Config.apiUrls["admin - update user"],
            url: uid,
            data: user,
        })
        .then((resp) => {
            if (resp.status !== 200) {
                console.error("Status code was not 200", resp);
                throw new Error("Unexpected status code");
            }

            if (resp.data.code !== "admin/user/update/success") {
                throw new NonSuccessError(resp);
            }

            if (resp.data.error) {
                throw new NonSuccessError(resp);
            }

            if (!resp.data.data) {
                throw new Error("Did not receive data (for user update)");
            }

            if (
                getState().login.user?.id.toString() ===
                resp.data.data?._id.toString()
            ) {
                dispatch(getUserAuthInfo());
            }

            dispatch({
                type: "ADMIN_USER_UPDATE_ONE",
                payload: resp.data.data,
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

export const deleteUser = (
    uid: string,
    callbacks?: ActionCallback
): ThAction<AdminUserSettingsActions> => (dispatch, getState) => {
    dispatch(start);

    axios
        .request<AdminUserDeleteResponse>({
            ...Config.apiUrls["admin - delete user"],
            url: uid,
        })
        .then((resp) => {
            if (resp.status !== 200) {
                throw new NonSuccessError(resp);
            }

            if (resp.data.code !== "admin/user/delete/success") {
                throw new NonSuccessError(resp);
            }

            if (
                getState().login.user?.id.toString() ===
                resp.data.data?._id.toString()
            ) {
                dispatch(getUserAuthInfo());
            }

            dispatch({
                type: "ADMIN_USER_DELETE_ONE",
                payload: resp.data?.data?._id as string,
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
