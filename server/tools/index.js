const mongoErrors = require("./mongo_errors");

module.exports = {
    ...require("./auth_control"),
};

module.exports.mongoErrors = mongoErrors;

module.exports.std_error_old = (message, err = null) => {
    return {
        status: "error",
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
        status: "error",
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
    /** @type {String[]} */ requiredList,
    /** @type {String} */ message,
    code = null
) => (req, res, realNext) => {
    if (!req.body && requiredList.length !== 0) {
        res.status(400).send(
            code
                ? {
                      status: "error",
                      code: code.replace(
                          "%s",
                          requiredList[0].replace(/\s+/, "-")
                      ),
                  }
                : module.exports.std_error_old(
                      message.replace("%s", requiredList[0] + "")
                  )
        );
    }

    for (let i = 0; i < requiredList.length; i++) {
        const item = requiredList[i];
        if (!req.body[item]) {
            res.status(400).send(
                code
                    ? {
                          status: "error",
                          code: code.replace("%s", item.replace(/\s+/, "-")),
                      }
                    : module.exports.std_error_old(
                          message.replace("%s", item + "")
                      )
            );
            return;
        }
    }

    realNext();
};
