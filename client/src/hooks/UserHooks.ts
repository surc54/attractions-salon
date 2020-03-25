import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignUpData } from "../models/User";
import { ReduxState } from "../reducers";
import { UserState } from "../reducers/_loginReducer";
import { logout, getUserAuthInfo, login, signUp } from "../actions";

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

        signUp: info => {
            return new Promise((resolve, reject) => {
                dispatch(
                    signUp(info, {
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
        // eslint-disable-next-line
    }, [userState]);

    return ret;
};

export interface UserHook extends UserState {
    login(email: string, password: string): Promise<undefined>;
    logout(): Promise<undefined>;

    signUp(info: SignUpData & { recaptchaToken: string }): Promise<undefined>;
    updateInfo(): Promise<undefined>;
}
