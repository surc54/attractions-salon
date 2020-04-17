import axios from "../models/axios";
import Config from "../models/Config";
import { axios_error } from "../tools";

export const updateService = (id, newService) => (dispatch, getState) => {
    if (!id) throw new Error("No id provided.");
    if (!newService) throw new Error("No new service provided.");

    dispatch({ type: "START_SERVICES_LOAD" });
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
                    throw new Error(
                        "Did not receive data (for service update)"
                    );
                }

                dispatch({
                    type: "UPDATE_SERVICE_END",
                    payload: resp.data.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "UPDATE_SERVICE_END",
                    payload: { error: axios_error(err)}
                });
            })
    );
};

export const addService = (newService) => (dispatch, getState) => {
    if (!newService) throw new Error("No new service provided.");

    dispatch({ type: "START_SERVICES_LOAD" });
    //
    axios
        .request({
            ...Config.apiUrls["create a service"],
            data: newService,
        })
        .then((resp) => {
            //if (resp.status !== 200) {
            //    console.error("Status code was not 200", resp);
            //    throw new Error("Unexpected status code");
            //}

            console.log(resp.data);
            console.log(resp.data.data);

            if (!resp.data) {
                throw new Error("Did not receive data (for service add)");
            }

            dispatch({
                type: "CREATE_SERVICE_END",
                payload: resp.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: "CREATE_SERVICE_END",
                payload: {error: axios_error(err)}
            });
        });
};

export const deleteService = (id) => (dispatch, getState) => {
    if (!id) throw new Error("No id provided.");

    dispatch({ type: "START_SERVICES_LOAD" });
    //
    axios.request(
        {
            ...Config.apiUrls["delete a service"],
            url: id,
        }
            .then((resp) => {
                //if (resp.status !== 200) {
                //    console.error("Status code was not 200", resp);
                //    throw new Error("Unexpected status code");
                //}

                if (!resp.data.data) {
                    throw new Error(
                        "Did not receive data (for service delete)"
                    );
                }

                dispatch({
                    type: "DELETE_SERVICE_END",
                    payload: resp.data.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "DELETE_SERVICE_END",
                    payload: {error: axios_error(err)}
                });
            })
    );
};
