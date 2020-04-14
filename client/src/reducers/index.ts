import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";
import _adminUserSettingsReducer, {
    AdminUserSettingsState,
} from "./_adminUserSettingsReducer";

export default combineReducers<ReduxState>({
    login: _loginReducer,
    adminUserSettings: _adminUserSettingsReducer,
});

export interface ReduxState {
    login: UserState;
    adminUserSettings: AdminUserSettingsState;
}
