export const emsg = (params: {
    err?: any;
    error?: any;
    code?: string;
}): string => {
    const { err, error, code } = params;

    if (code) {
        return `Coded messages unavailable (${code})`;
    }

    const e = err ?? error;

    return (
        (typeof e?.message === "string" && e.message) ||
        (typeof e?.errmsg === "string" && e.errmsg) ||
        (typeof e === "string" && e) ||
        "Unknown error"
    );
};
