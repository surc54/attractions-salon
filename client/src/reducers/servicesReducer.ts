import { Reducer } from "redux";
import {
    ServiceActions,
    GetServicesInfoEnd,
} from "../actions/types";

const INIT: ServiceState = {
    loading: true,
    services: [],
    error: null,
}; 

const reducer: Reducer<ServiceState, ServiceActions> = (state = INIT, action) => {
    console.log(state, action);
    switch (action.type) {
        case "GET_SERVICES_INFO_START": {
            return { ...state, loading: true };
        }
        case "GET_SERVICES_INFO_END": {
            const { payload } = action as GetServicesInfoEnd;
            return {
                ...state,
                loading: false,
                error: payload?.error,
                services: payload?.services,
            };
        }
        default: state
    }
}

export interface ServiceState {
    loading: boolean;
    error?: any | null;
    services: any;
}

export default reducer;