import axios from "../models/axios";
import Config from "../models/Config";

import {
    GET_SERVICES_INFO_START,
    GET_SERVICES_INFO_END,
} from "./types";

export const services = () => {
    console.log("ebtrnymui,untbrvfe")
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

                if (response.status !== 200) {
                    console.error("Status code was not 200", response);
                    throw new Error("Unexpected status code");
                }

                dispatch({
                    type: GET_SERVICES_INFO_END,
                    payload: {
                        error: response.data.error,
                        services: response.data.data,
                    },
                });

                //console.log(response.data.data)
            })
            .catch((reason) => {
                // I should do something that makes it easier to debug
                console.log(reason);
                throw new Error("Unexpected error @GET_SERVICES_INFO");
            });
    };
};
