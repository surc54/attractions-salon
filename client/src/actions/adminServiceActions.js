import axios from "../models/axios";
import Config from "../models/Config";
import { axios_error } from "../tools";

import {
    START_SERVICES_LOAD,
    UPDATE_SERVICE_END,
    DELETE_SERVICE_END,
    CREATE_SERVICE_END,
} from "./types";

export const updateService = (id, newService) => (dispatch, getState) => {

    dispatch({ type: START_SERVICES_LOAD });
    //
    axios.request(
        {
            ...Config.apiUrls["update a service"],
            url: id,
            data: newService,
        }
            .then((resp) => {
                //if (resp.status !== 200) {
                //    console.error("Status code was not 200", resp);
                //    throw new Error("Unexpected status code");
                //}

                if (!resp.data.data) {
                    throw new Error("Did not receive data (for service update)");
                }

                //if (
                //    getState().login.user?.id.toString() ===
                //    resp.data.data?._id.toString()
                //) {
                //    dispatch(getUserAuthInfo());
                //}

                dispatch({
                    type: UPDATE_SERVICE_END,
                    payload: resp.data.data,
                });
            })
            .catch((err) => {
                dispatch(error(axios_error(err)));
                
            })
};
