const mongoErrors = require("./mongo_errors");

module.exports.mongoErrors = mongoErrors;

module.exports.std_error_old = (message, err = null) => {
    return {
        status: "fail",
        message,
        ...(err ? { error: err } : {}),
    };
};

module.exports.send_code_error = (res, status, code, extra = {}) => {
    res.status(status).send({
        status: "error",
        code: code || "success",
        ...extra,
    });
};

module.exports.send_code_success = (res, status, code, extra = {}) => {
    res.status(status).send({
        status: "ok",
        code: code || "success",
        ...extra,
    });
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

module.exports.requiredBody = (requiredList, /** @type {String} */ message) => (
    req,
    res,
    realNext
) => {
    if (!req.body && requiredList.length !== 0) {
        res.send(
            module.exports.std_error_old(
                message.replace("%s", requiredList[0] + "")
            )
        );
    }

    for (let i = 0; i < requiredList.length; i++) {
        const item = requiredList[i];
        if (!req.body[item]) {
            res.send(
                module.exports.std_error_old(message.replace("%s", item + ""))
            );
            return;
        }
    }

    realNext();
};
