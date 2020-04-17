import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesList, addToCart, removeFromCart } from "../actions";
import { addService, deleteService, updateService } from "../actions";

/**
 * I dont know what I am doing,
 * let it be known that I am copy-pasting really hard atm
 */

export const useServices = () => {
    // get dispatcher. required to use actions in redux
    const dispatch = useDispatch();

    // Retrieve services state from redux.
    const serviceState = useSelector((state) => state.services);
    // userAuth = state + (login) + (logout) + (signUp) + (updateInfo)
    // ah yeah, this hook will return the services state + the new functions we are gonna define
    const [ret, setRet] = React.useState({
        ...serviceState,

        getServicesList: () => {
            dispatch(getServicesList());
        },

        addToCart: (id) => {
            dispatch(addToCart(id));
        },

        removeFromCart: (id) => {
            dispatch(removeFromCart(id));
        },

        addService: (newService) => {
            dispatch(addService(newService));
        },

        deleteService: (id) => {
            dispatch(deleteService(id));
        },

        updateService: (id, newService) => {
            dispatch(updateService(id, newService));
        },
    });

    React.useEffect(() => {
        setRet({
            ...ret,
            ...serviceState,
        });
    }, [serviceState]);

    return ret;
};
