module.exports.std_error = (message, err = null) => ({
    status: "fail",
    message,
    ...(err ? { error: err } : {}),
});

module.exports.requiredBody = (
    requiredList,
    /** @type {String} */ message,
    middleware,
    next
) => (req, res, realNext) => {
    if (!req.body && requiredList.length !== 0) {
        res.send(
            module.exports.std_error(
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
                module.exports.std_error(message.replace("%s", item + ""))
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
