const mongoErrors = require("./mongo_errors");

module.exports.mongoErrors = mongoErrors;

module.exports.std_error_old = (message, err = null) => {
    return {
        status: "fail",
        message,
        ...(err ? { error: err } : {}),
    };
};

module.exports.std_error = (err = {}, backupMessage = "Unknown error") => {
    return {
        status: "fail",
        error:
            (err &&
                err.message &&
                    typeof err.message === "string" &&
                    err.message) ||
            (typeof err === "string" && err) ||
            backupMessage,
    };
};

module.exports.requiredBody = (
    requiredList,
    /** @type {String} */ message,
    middleware,
    next
) => (req, res, realNext) => {
    if (!req.body && requiredList.length !== 0) {
        res.send(
            module.exports.std_error_old(
                message.replace("%s", requiredList[0] + "")
            )
        );
        return;
    }

    let ok = true;

    requiredList.forEach(item => {
        if (!req.body[item]) {
            ok = false;
            res.send(
                module.exports.std_error_old(message.replace("%s", item + ""))
            );
            return;
        }
    });

    if (!ok) return;

    if (middleware) {
        realNext();
    } else if (next) {
        next(req, res);
    }
};
