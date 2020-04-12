import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";
import _ezSettingsReducer from "./_ezSettingsReducer";

export default combineReducers<ReduxState>({
    login: _loginReducer,
    ezSettings: _ezSettingsReducer as any,
});

export interface ReduxState {
    login: UserState;
    ezSettings: EzSettingsState;
}

export interface EzSettingsState {
    [key: string]: {
        loading?: boolean;
        value?: string;
        error?: any;
    };
}
