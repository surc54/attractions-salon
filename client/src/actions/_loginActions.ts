// import {} from "react-redux";
import axios from "../models/axios";
import Config from "../models/Config";
import {
    GetAuthInfoResponse,
    LogoutResponse,
    LoginResponse,
} from "../models/ResponseTypes";
import { axios_error, emsg } from "../tools";
import {
    ActionCallback,
    AUTH_LOGOUT_END,
    GET_AUTH_INFO_END,
    GET_AUTH_INFO_START,
    ThAction,
    UserActions,
} from "./types";

/**
 * Planned Actions:
 *  - Get info
 *  - Sign in
 *  - Sign out
 *  - Sign up
 */

export const getUserAuthInfo = (
    callbacks: ActionCallback = {}
): ThAction<UserActions> => {
    return (dispatch, getState) => {
        dispatch({
            type: GET_AUTH_INFO_START,
        });

        axios
            .request<GetAuthInfoResponse>({
                ...Config.apiUrls["get account info"],
            })
            .then(resp => {
                if (resp.status !== 200) {
                    console.error("Status code was not 200", resp);
                    throw new Error("Unexpected status code");
                }

                const { data } = resp;

                if (data.error) {
                    console.error("Data retrieved not okay", data);
                    throw new Error(data.error ?? data.code ?? "error");
                } else if (data.code !== "auth/info/success") {
                    dispatch({
                        type: GET_AUTH_INFO_END,
                        payload: {
                            error: emsg({ code: data.code }),
                        },
                    });

                    callbacks?.catch?.({
                        code: data.code,
                        message: emsg({ code: data.code }),
                    });
                }

                dispatch({
                    type: GET_AUTH_INFO_END,
                    payload: {
                        signedIn: data.signedIn ?? false,
                        error: data.error,
                        user: data.user,
                    },
                });

                callbacks?.then?.();
            })
            .catch(err => {
                dispatch({
                    type: GET_AUTH_INFO_END,
                    payload: {
                        error: axios_error(err),
                    },
                });

                callbacks?.catch?.({
                    message: axios_error(err),
                });
            });
    };
};

export const login = (
    email: string,
    password: string,
    callbacks: ActionCallback = {}
): ThAction<UserActions> => {
    return (dispatch, getState) => {
        dispatch({
            type: "GET_AUTH_INFO_START",
        });

        axios
            .request<LoginResponse>({
                ...Config.apiUrls["login user"],
                data: {
                    email,
                    password,
                },
            })
            .then(resp => {
                if (resp.status !== 200) {
                    console.error("Status code was not 200", resp);
                    throw new Error("Unexpected status code");
                }

                const { code, status, data, error, user } = resp.data;

                if (error || code !== "auth/sign-in/success") {
                    throw { response: resp };
                }

                dispatch({
                    type: "GET_AUTH_INFO_END",
                    payload: {
                        signedIn: true,
                        user: user,
                    },
                });

                callbacks?.then?.();
            })
            .catch(err => {
                dispatch({
                    type: AUTH_LOGOUT_END,
                    payload: {
                        error: axios_error(err),
                    },
                });

                callbacks?.catch?.({
                    message: axios_error(err),
                });
            });
    };
};

export const logout = (
    callbacks: ActionCallback = {}
): ThAction<UserActions> => {
    return (dispatch, getState) => {
        dispatch({
            type: GET_AUTH_INFO_START,
        });

        axios
            .request<LogoutResponse>({
                ...Config.apiUrls["logout user"],
            })
            .then(resp => {
                if (resp.status != 200) {
                    throw new Error(`Unexpected status code (${resp.status})`);
                }

                if (resp.data.code !== "auth/sign-out/success") {
                    throw {
                        response: resp,
                    };
                }

                dispatch({
                    type: AUTH_LOGOUT_END,
                });

                callbacks?.then?.();
            })
            .catch(err => {
                dispatch({
                    type: AUTH_LOGOUT_END,
                    payload: {
                        error: axios_error(err),
                    },
                });

                callbacks?.catch?.({
                    message: axios_error(err),
                });
            });
    };
};
