import { combineReducers } from "redux";
import _loginReducer, { UserState } from "./_loginReducer";

export default combineReducers<ReduxState>({
    login: _loginReducer,
});

export interface ReduxState {
    login: UserState;
}
