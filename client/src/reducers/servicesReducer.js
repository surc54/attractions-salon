// State type (for reference)
// {
//     loading: boolean;
//     error?: any | null;
//     services: any;
// }
const INIT = {
    loading: true,
    services: [],
    error: null,
};

/**
 * START_SERVICES_LOAD
 * UPDATE_SERVICE_END
 * DELETE_SERVICE_END
 * CREATE_SERVICE_END
 */

const reducer = (state = INIT, { type, payload }) => {
    switch (type) {
        case "START_SERVICES_LOAD": {
            console.log(state, { type, payload });
            return { ...state, loading: true };
        }
        case "GET_SERVICES_INFO_END": {
            console.log(state, { type, payload });
            // if error, keep old services list
            if (payload.error) {
                return {
                    ...state,
                    loading: false,
                    error: payload.error,
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    error: null,
                    services: payload.services.map((x) => {
                        const old = state.services.find(
                            (y) => x._id.toString() === y._id.toString()
                        );

                        return {
                            ...x,
                            inCart: (old && old.inCart) || false,
                        };
                    }),
                };
            }
        }
        case "SERVICE_ADD_TO_CART": {
            console.log(state, { type, payload });
            return {
                ...state,
                services: state.services.map((x) =>
                    x._id === payload
                        ? {
                              ...x,
                              inCart: true,
                          }
                        : x
                ),
            };
        }
        case "SERVICE_REMOVE_FROM_CART": {
            console.log(state, { type, payload });
            return {
                ...state,
                services: state.services.map((x) =>
                    x._id === payload
                        ? {
                              ...x,
                              inCart: false,
                          }
                        : x
                ),
            };
        }
        case "UPDATE_SERVICE_END": {
            console.log(state, { type, payload });
            // expect payload to be one service
            if (payload.error) {
                return {
                    ...state,
                    loading: false,
                    error: payload.error,
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    services: state.services.map((x) =>
                        x._id === payload._id ? payload : x
                    ),
                };
            }
        }
        case "DELETE_SERVICE_END": {
            console.log(state, { type, payload });
            if (payload.error) {
                return {
                    ...state,
                    loading: false,
                    error: payload.error,
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    services: state.services.filter(
                        (x) => x._id !== payload._id
                    ),
                };
            }
        }
        case "CREATE_SERVICE_END": {
            console.log(state, { type, payload });
            if (payload.error) {
                return {
                    ...state,
                    loading: false,
                    error: payload.error,
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    services: [...state.services, payload],
                };
            }
        }
        default:
            return state;
    }
};

export default reducer;
