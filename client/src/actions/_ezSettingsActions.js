import axios from "axios";
import Config from "../models/Config";
import { axios_error } from "../tools";

// example of action in javascript, as opposed to typescript

/**
 * Get an Ez-Setting
 * @param {String} key The key of the setting you want
 * @param {{then: () => void, catch: (err) => void}} callbacks
 */
export const getSetting = (key, callbacks) => (dispatch, getState) => {
    // grab callbacks and set default values
    const { then = () => false, catch: catchF = () => false } = callbacks || {};

    if (!key) {
        catchF({
            message: "No key provided to ez-settings.",
        });
        return;
    }

    dispatch({
        type: "EZS_LOADING",
        payload: {
            key,
        },
    });

    axios
        .request({
            ...Config.apiUrls["ez-settings - get"],
            params: {
                key,
            },
        })
        .then((resp) => {
            if (resp.status !== 200) {
                throw {
                    response: resp,
                };
            }

            // dont worry about the comment below. just to get types.
            /** @type {import("../models/ResponseTypes").EzSettingGetResponse} */
            const data = resp.data;

            if (!data || data.code !== "ez-settings/get/success") {
                throw {
                    response: resp,
                };
            }

            dispatch({
                type: "EZS_UPDATE_SETTING",
                payload: {
                    key,
                    value: data.data ? data.data.value : null,
                },
            });

            then(data.data ? data.data.value : null);
        })
        .catch((err) => {
            dispatch({
                type: "EZS_ERROR",
                payload: {
                    key,
                    error: axios_error(err),
                },
            });

            catchF({
                message: axios_error(err),
            });
        });
};

/**
 * Get an Ez-Setting
 * @param {String} key The key of the setting.
 * @param {String} value The value you want to set it to.
 * @param {{then: () => void, catch: (err) => void}} callbacks
 */
export const setSetting = (key, value, callbacks) => (dispatch, getState) => {
    // grab callbacks and set default values
    const { then = () => false, catch: catchF = () => false } = callbacks || {};

    if (!key) {
        catchF({
            message: "No key provided to ez-settings.",
        });
        return;
    }

    dispatch({
        type: "EZS_LOADING",
        payload: {
            key,
        },
    });

    axios
        .request({
            ...Config.apiUrls["ez-settings - set"],
            data: {
                key,
                value,
            },
        })
        .then((resp) => {
            if (resp.status !== 200) {
                throw {
                    response: resp,
                };
            }

            // dont worry about the comment below. just to get types.
            /** @type {import("../models/ResponseTypes").EzSettingSetResponse} */
            const data = resp.data;

            if (!data || data.code !== "ez-settings/set/success") {
                throw {
                    response: resp,
                };
            }

            dispatch({
                type: "EZS_UPDATE_SETTING",
                payload: {
                    key,
                    value: data.data ? data.data.value : null,
                },
            });

            then(data.data ? data.data.value : null);
        })
        .catch((err) => {
            dispatch({
                type: "EZS_ERROR",
                payload: {
                    key,
                    error: axios_error(err),
                },
            });

            catchF({
                message: axios_error(err),
            });
        });
};
