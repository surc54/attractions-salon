import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../actions/_adminUserSettingsActions";
import User from "../models/User";
import { ReduxState } from "../reducers";
import { AdminUserSettingsState } from "../reducers/_adminUserSettingsReducer";

export const useAdminUserSettings = (): AdminUserHook => {
    const dispatch = useDispatch();
    const adminUserState = useSelector<ReduxState, AdminUserSettingsState>(
        (x) => x.adminUserSettings
    );
    const [ret, setRet] = React.useState<AdminUserHook>({
        ...adminUserState,

        getUserList: () => {
            return new Promise((resolve, reject) => {
                dispatch(
                    getUsersList({
                        then: resolve,
                        catch: reject,
                    })
                );
            });
        },

        getUserInfo: () => {
            return Promise.reject("unimplemented");
        },

        updateUser: () => {
            return Promise.reject("unimplemented");
        },

        deleteUser: () => {
            return Promise.reject("unimplemented");
        },
    });

    React.useEffect(() => {
        setRet({
            ...ret,
            ...adminUserState,
        });
        // eslint-disable-next-line
    }, [adminUserState]);

    return ret;
};

export interface AdminUserHook extends AdminUserSettingsState {
    // Get list of users
    getUserList(): Promise<undefined>;

    // Read/Update/Delete
    getUserInfo(uid: string): Promise<undefined>;
    updateUser(uid: string, data: User): Promise<undefined>;
    deleteUser(uid: string): Promise<undefined>;
}
