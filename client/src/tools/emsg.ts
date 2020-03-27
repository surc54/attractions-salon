export const emsg = (params: {
    err?: any;
    error?: any;
    code?: string;
    message?: string;
}): string => {
    if (!params) {
        return "Unknown error";
    }

    const { err, error, code, message } = params;

    if (message) return message;

    const e = err ?? error;

    if (code) {
        if (typeof e === "string") return e;

        return `Coded messages unavailable (${code})`;
    }

    return (
        (typeof e?.message === "string" && e.message) ||
        (typeof e?.errmsg === "string" && e.errmsg) ||
        (typeof e === "string" && e) ||
        "Unknown error"
    );
};
