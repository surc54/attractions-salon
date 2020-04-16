const NO_PERMS_ERR = {
    name: "NoPermsErr",
    statusCode: 403,
    message: "You do not have permission for this area.",
};

module.exports.permitRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        next(NO_PERMS_ERR);
        return;
    }

    if (req.user && roles.includes(req.user.role)) {
        next();
    } else {
        next(NO_PERMS_ERR);
    }
};

module.exports.denyRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        next(NO_PERMS_ERR);
        return;
    }

    if (req.user && !roles.includes(req.user.role)) {
        next();
    } else {
        next(NO_PERMS_ERR);
    }
};
