import { Reducer } from "redux";

const INIT = {
    loading: true,
    services: [],
    error: null,
};

const reducer = (state = INIT, action) => {
    switch (action.type) {
        case "GET_SERVICES_INFO_START": {
            return { ...state, loading: true };
        }
        case "GET_SERVICES_INFO_START": {
            const { payload } = action;
            return {
                ...state,
                loading: false,
                error: payload?.error,
                services: payload?.services,
            };
        }
    }
}

export default reducer;