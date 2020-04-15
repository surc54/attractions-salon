import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";
import { reducer as formReducer } from "redux-form";
import testimonialReducer from "./_testimonialReducer";
import _adminUserSettingsReducer, {
    AdminUserSettingsState,
} from "./_adminUserSettingsReducer";
import _adminTestimonialSettingsReducer, {
    AdminTestimonialSettingsState,
} from "./_adminTestimonialSettingReducer";

export default combineReducers<ReduxState>({
    login: _loginReducer,
    form: formReducer,
    testimonial: testimonialReducer,
    adminUserSettings: _adminUserSettingsReducer,
    adminTestimonialSettings: _adminTestimonialSettingsReducer,
});

export interface ReduxState {
    login: UserState;
    form: any;
    testimonial: any;
    adminUserSettings: AdminUserSettingsState;
    adminTestimonialSettings: AdminTestimonialSettingsState;
}
