import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../reducers";
import { services } from "../actions/serviceActions";

/**
 * I dont know what I am doing, 
 * let it be known that I am copy-pasting really hard atm
 */

export const useServices = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.login);
    const [ret, setRet] = React.useState({
        ...userState,
        services: () => {
            return new Promise((resolve, reject) => {
                dispatch(
                    services({
                        catch: reject,
                        then: resolve,
                    })
                );
            });
        },
    });

    React.useEffect(() => {
        setRet({
            ...ret,
            ...userState,
        });
        // eslint-disable-next-line
    }, [userState]);

    return ret;
}