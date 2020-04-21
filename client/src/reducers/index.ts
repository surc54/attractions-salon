import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";
import _ezSettingsReducer from "./_ezSettingsReducer";
import { reducer as formReducer } from "redux-form";
import testimonialReducer from "./_testimonialReducer";
import _adminUserSettingsReducer, {
    AdminUserSettingsState,
} from "./_adminUserSettingsReducer";
import _adminTestimonialSettingsReducer, {
    AdminTestimonialSettingsState,
} from "./_adminTestimonialSettingReducer";

import servicesReducer from "./servicesReducer"

export default combineReducers<ReduxState>({
    login: _loginReducer,
    ezSettings: _ezSettingsReducer as any,
    form: formReducer,
    testimonial: testimonialReducer,
    adminUserSettings: _adminUserSettingsReducer,
    adminTestimonialSettings: _adminTestimonialSettingsReducer,
    services: servicesReducer,
});

export interface ReduxState {
    login: UserState;
    ezSettings: EzSettingsState;
    form: any;
    testimonial: any;
    adminUserSettings: AdminUserSettingsState;
    adminTestimonialSettings: AdminTestimonialSettingsState;
    services: any;
}

export interface EzSettingsState {
    [key: string]: {
        loading?: boolean;
        value?: string;
        error?: any;
    };
}
