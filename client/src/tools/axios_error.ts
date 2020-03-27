import { emsg } from "./emsg";

export const axios_error = (err: any): string => {
    if (err?.response) {
        return emsg({
            err: err?.response?.data?.error ?? err,
            code: err?.response?.data?.code,
        });
    } else if (err?.request) {
        return emsg({ err: "No response from server" });
    } else {
        return emsg({ err });
    }
};
