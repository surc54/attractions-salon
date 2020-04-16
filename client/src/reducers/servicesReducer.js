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

const reducer = (state = INIT, {type, payload}) => {
    
    switch (type) {
        case "GET_SERVICES_INFO_START": {
            console.log(state, {type, payload});
            return { ...state, loading: true }; 
        }
        case "GET_SERVICES_INFO_END": {
            console.log(state, {type, payload});
            // if error, keep old services list
            if (payload.error) {
                return {
                    ...state,
                    loading: false,
                    error: payload.error
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    error: null,
                    services: payload.services.map(x => ({
                        ...x,
                        inCart: false
                    }))
                }
            }
        }
        case "SERVICE_ADD_TO_CART": {
            return {
                ...state,
                services: state.services.map(x => x._id === payload ? {
                    ...x,
                    inCart: true,
                } : x)
            }
        }
        case "SERVICE_REMOVE_FROM_CART": {
            return {
                ...state,
                services: state.services.map(x => x._id === payload ? {
                    ...x,
                    inCart: false,
                } : x)
            }
        }
        default: return state;
    }
}

export default reducer;