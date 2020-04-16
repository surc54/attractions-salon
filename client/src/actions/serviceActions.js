import axios from "../models/axios";
import Config from "../models/Config";
import {axios_error} from "../tools"

import {
    GET_SERVICES_INFO_START,
    GET_SERVICES_INFO_END,
    SERVICE_ADD_TO_CART,
    SERVICE_REMOVE_FROM_CART
} from "./types";

// Rename to getServicesList() or something
export const getServicesList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: GET_SERVICES_INFO_START,
        });


        axios
            .request({
                ...Config.apiUrls["get services info"],
            })
            .then((response) => {
                // current issues:
                // ignoring errors
                //      - no error checking
                // dont know shape of "response"
                //      - console.log, and then see what can I use

                //returnVal = value.data.data;
                //console.log(response.data.data)

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
                    type: GET_SERVICES_INFO_END,
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
                    type: GET_SERVICES_INFO_END,
                    payload: {
                        error: axios_error(reason)
                    }
                })
                // throw new Error("Unexpected error @GET_SERVICES_INFO");
            });
    };
};

export const addToCart = (id) => {
    if (!id) throw new Error("No id provided.");

    return {
        type: SERVICE_ADD_TO_CART,
        payload: id
    };
}

export const removeFromCart = (id) => {
    if (!id) throw new Error("No id provided.");

    return {
        type: SERVICE_REMOVE_FROM_CART,
        payload: id
    };
}
