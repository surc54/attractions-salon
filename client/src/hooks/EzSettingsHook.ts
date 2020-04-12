import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState, EzSettingsState } from "../reducers";
import { getSetting, setSetting } from "../actions";

export const useEzSettings = (): EzSettingsHook => {
    const dispatch = useDispatch();
    const ezSettingsState = useSelector<ReduxState, EzSettingsState>(
        (state) => state.ezSettings
    );

    const [ret, setRet] = React.useState<EzSettingsHook>({
        state: ezSettingsState,

        get: (key) => {
            return new Promise((resolve, reject) => {
                dispatch(
                    getSetting(key, {
                        catch: reject,
                        then: resolve,
                    })
                );
            });
        },

        set: (key, value) => {
            return new Promise((resolve, reject) => {
                dispatch(
                    setSetting(key, value, {
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
            state: ezSettingsState,
        });

        // eslint-disable-next-line
    }, [ezSettingsState]);

    return ret;
};

export interface EzSettingsHook {
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<string>;
    state: EzSettingsState;
}
