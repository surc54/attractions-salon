const express = require("express");
const config = require("../config/config");
const validator = require("validator").default;
const passport = require("passport");
const {
    requiredBody,
    mongoErrors,
    send_code_error,
    send_code_success,
} = require("../tools");
const User = require("../models/user.model");

const UID_REGEX = /[A-Za-z0-9\-_]+/;

/*
 * HTTP STATUS CODES
 *   200 - OK
 *   201 - CREATED
 *
 *   400 - BAD REQUEST
 *   401 - UNAUTHORIZED (NOT LOGGED IN)
 *   403 - FORBIDDEN (LOGGED IN, NO PERMISSION)
 *
 *   500 - SERVER ERROR
 *   501 - NOT IMPLEMENTED
 *   502 - BAD GATEWAY (THE EXTERNAL API USED DIDN'T RESPOND PROPERLY)
 */

/** @type {express.RequestHandler} */
module.exports.info = (req, res) => {
    send_code_success(res, 200, "auth/info/success", {
        signedIn: !!req.user,
        user: req.user || null,
    });
};

/** @type {express.RequestHandler[]} */
module.exports.signIn = [
    passport.authenticate("local"),
    (req, res) => {
        send_code_success(res, 200, "auth/sign-in/success", {
            user: req.user,
        });
    },
];

/** @type {express.RequestHandler} */
module.exports.signOut = (req, res) => {
    if (req.user) {
        req.logout();

        send_code_success(res, 200, "auth/sign-out/success");
    } else {
        send_code_error(res, 401, "auth/sign-out/not-signed-in");
    }
};

module.exports.create = [
    requiredBody(
        ["email", "password", "firstName", "lastName"],
        "auth/sign-up/missing-%s"
    ),
    (req, res) => {
        const {
            email,
            password,
            firstName: raw_firstName,
            lastName: raw_lastName,
        } = req.body;

        if (!validator.isEmail(email)) {
            send_code_error(res, 400, "auth/sign-up/email-illegal-format");
            return;
        }

        const firstName = validator.escape(raw_firstName);
        const lastName = validator.escape(raw_lastName);

        const user = new User({
            name: {
                first: firstName,
                last: lastName,
            },
            email,
            password: User.hashPassword(password),
        });

        user.save()
            .then(resp => {
                send_code_success(res, 201, "auth/sign-up/success");
            })
            .catch(err => {
                send_code_error(res, 500, "auth/sign-up/unknown-error", {
                    error:
                        err && err.name && err.name === "MongoError" && err.code
                            ? mongoErrors.users[err.code]
                            : err,
                });

                // TODO: Log error into database (if possible, ofc)
                console.error("Could not save user to database:", err);
            });
    },
];

/** @type {{[key: string]: express.RequestHandler}} */
module.exports.admin = {};

/** @type {express.RequestHandler} */
module.exports.admin.list = (req, res) => {
    const { page = 0 } = req.query;

    const pageNum = Number(page) || 0;

    User.find({}, "-password", {
        limit: config.options.admin.accountsPerPage,
        skip: (pageNum * config.options.admin.accountsPerPage),
    })
        .then(response => {
            send_code_success(res, 200, "admin/auth/list/success", {
                data: response.map(x => x.toObject({ virtuals: true })),
            });
        })
        .catch(err => {
            send_code_error(res, 500, "admin/auth/list/unknown-error", {
                error: err,
            });
        });
};

/** @type {express.RequestHandler} */
module.exports.admin.info = (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        send_code_error(res, 400, "admin/auth/info/missing-uid");
        return;
    }

    if (!UID_REGEX.test(uid)) {
        send_code_error(res, 400, "admin/auth/info/uid-illegal-format");
        return;
    }

    User.findById(uid, "-password")
        .then(response => {
            send_code_success(res, 200, "admin/auth/info/success", {
                data: response.toObject({ virtuals: true }),
            });
        })
        .catch(err =>
            send_code_error(res, 500, "admin/auth/info/unknown-error", {
                error: err,
            })
        );
};
