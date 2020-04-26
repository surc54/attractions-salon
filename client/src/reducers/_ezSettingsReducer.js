const INIT = {};
// idea:
// { [key: string]: {loading: boolean, value: string} }

export default (state = INIT, { type, payload }) => {
    switch (type) {
        case "EZS_LOADING":
            return {
                ...state,
                [payload.key]: {
                    ...(state[payload.key] || {}),
                    loading: true,
                },
            };
        case "EZS_UPDATE_SETTING":
            return {
                ...state,
                [payload.key]: {
                    ...(state[payload.key] || {}),
                    loading: false,
                    value: payload.value,
                    error: undefined,
                },
            };
        case "EZS_ERROR":
            return {
                ...state,
                [payload.key]: {
                    ...(state[payload.key] || {}),
                    loading: false,
                    error: payload.error,
                },
            };
        default:
            // dont modify
            return state;
    }
};