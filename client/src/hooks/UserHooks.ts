import React from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../models/User";
import { ReduxState } from "../reducers";
import { UserState } from "../reducers/_loginReducer";
import { logout, getUserAuthInfo, login } from "../actions";

export const useUserAuth = (): UserHook => {
    const dispatch = useDispatch();
    const userState = useSelector<ReduxState, UserState>(state => state.login);
    const [ret, setRet] = React.useState<UserHook>({
        ...userState,
        login: (email, password) => {
            return new Promise((resolve, reject) => {
                dispatch(
                    login(email, password, {
                        catch: reject,
                        then: resolve,
                    })
                );
            });
        },

        logout: () => {
            return new Promise((resolve, reject) => {
                dispatch(
                    logout({
                        then: resolve,
                        catch: reject,
                    })
                );
            });
        },

        updateInfo: () => {
            return new Promise((resolve, reject) => {
                dispatch(
                    getUserAuthInfo({
                        then: resolve,
                        catch: reject,
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
    }, [userState]);

    return ret;
};

export interface UserHook extends UserState {
    login(email: string, password: string): Promise<undefined>;
    logout(): Promise<undefined>;
    updateInfo(): Promise<undefined>;
}
