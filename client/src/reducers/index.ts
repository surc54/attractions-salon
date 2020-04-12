import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";
import { reducer as formReducer } from "redux-form";
import testimonialReducer from "./_testimonialReducer";

export default combineReducers<ReduxState>({
    login: _loginReducer,
    form: formReducer,
    testimonial: testimonialReducer,
});

export interface ReduxState {
    login: UserState;
    form: any;
    testimonial: any;
}
