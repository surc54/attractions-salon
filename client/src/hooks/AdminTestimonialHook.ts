import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getTestimonialsList,
    deleteTestimonial,
} from "../actions/_adminTestimonialSettingAction";
import { ReduxState } from "../reducers";
import { AdminTestimonialSettingsState } from "../reducers/_adminTestimonialSettingReducer";

export const useAdminTestimonialSettings = (): AdminTestimonialHook => {
    const dispatch = useDispatch();
    const adminTestimonialState = useSelector<
        ReduxState,
        AdminTestimonialSettingsState
    >((x) => x.adminTestimonialSettings);
    const [ret, setRet] = React.useState<AdminTestimonialHook>({
        ...adminTestimonialState,

        getTestimonialList: () => {
            return new Promise((resolve, reject) => {
                dispatch(
                    getTestimonialsList({
                        then: resolve,
                        catch: reject,
                    })
                );
            });
        },

        deleteTestimonial: (uid) =>
            new Promise((resolve, reject) => {
                dispatch(
                    deleteTestimonial(uid, {
                        then: resolve,
                        catch: reject,
                    })
                );
            }),
    });

    React.useEffect(() => {
        setRet({
            ...ret,
            ...adminTestimonialState,
        });
        // eslint-disable-next-line
    }, [adminTestimonialState]);

    return ret;
};

export interface AdminTestimonialHook extends AdminTestimonialSettingsState {
    getTestimonialList(): Promise<undefined>;
    deleteTestimonial(uid: string): Promise<undefined>;
}
