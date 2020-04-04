import {
    ActionCallback,
    ThAction,
    AdminUserSettingsActions,
    AdminUserStart,
    AdminUserStop,
    AdminUserError,
    NonSuccessError,
} from "./types";
import axios from "../models/axios";
import Config from "../models/Config";
import { AdminUserInfo, AdminUserList } from "../models/ResponseTypes";
import { axios_error } from "../tools";

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

export const getUsersList = (
    callbacks: ActionCallback = {}
): ThAction<AdminUserSettingsActions> => {
    return (dispatch, getState) => {
        dispatch(start);

        axios
            .request<AdminUserList>(Config.apiUrls["admin - get user list"])
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
                    type: "ADMIN_USER_UPDATE_LIST",
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
};
