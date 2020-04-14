import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";
<<<<<<< HEAD
import { reducer as formReducer } from "redux-form";
import testimonialReducer from "./_testimonialReducer";

export default combineReducers<ReduxState>({
    login: _loginReducer,
    form: formReducer,
    testimonial: testimonialReducer,
=======
import _adminUserSettingsReducer, {
    AdminUserSettingsState,
} from "./_adminUserSettingsReducer";

export default combineReducers<ReduxState>({
    login: _loginReducer,
    adminUserSettings: _adminUserSettingsReducer,
>>>>>>> 8cdfa1ad123cd6692a3fc259d4ead8be64ce1ae0
});

export interface ReduxState {
    login: UserState;
<<<<<<< HEAD
    form: any;
    testimonial: any;
=======
    adminUserSettings: AdminUserSettingsState;
>>>>>>> 8cdfa1ad123cd6692a3fc259d4ead8be64ce1ae0
}
