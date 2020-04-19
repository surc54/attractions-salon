import axios from "../models/axios";
import Config from "../models/Config";
import { axios_error } from "../tools";

export const getServicesList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: "START_SERVICES_LOAD",
        });

        axios
            .request({
                ...Config.apiUrls["get services info"],
            })
            .then((response) => {
                // i put this out of habit, but really not necessary lol - surc
                if (response.status !== 200) {
                    console.error("Status code was not 200", response);
                    throw new Error("Unexpected status code");
                }

                if (response.data.status !== "ok") {
                    throw new Error("Unexpected status text.");
                }

                // assume all went well.
                dispatch({
                    type: "GET_SERVICES_INFO_END",
                    payload: {
                        // error: response.data.error,
                        error: null,
                        services: response.data.data,
                    },
                });

                //console.log(response.data.data)
            })
            .catch((reason) => {
                console.error(reason);
                dispatch({
                    type: "GET_SERVICES_INFO_END",
                    payload: {
                        error: axios_error(reason),
                    },
                });
            });
    };
};

export const addToCart = (id) => {
    if (!id) throw new Error("No id provided.");

    return {
        type: "SERVICE_ADD_TO_CART",
        payload: id,
    };
};

export const removeFromCart = (id) => {
    if (!id) throw new Error("No id provided.");

    return {
        type: "SERVICE_REMOVE_FROM_CART",
        payload: id,
    };
};
