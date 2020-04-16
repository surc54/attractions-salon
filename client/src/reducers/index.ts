import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";
import _adminUserSettingsReducer, {
    AdminUserSettingsState,
} from "./_adminUserSettingsReducer";

import servicesReducer from "./servicesReducer"

export default combineReducers<ReduxState>({
    login: _loginReducer,
    adminUserSettings: _adminUserSettingsReducer,
    services: servicesReducer,
});

export interface ReduxState {
    login: UserState;
    adminUserSettings: AdminUserSettingsState;
    services: any;
}
