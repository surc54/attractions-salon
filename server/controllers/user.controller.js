const express = require("express");
const validator = require("validator").default;
const passport = require("passport");
const axios = require("axios").default;
const {
    requiredBody,
    mongoErrors,
    send_code_error,
    send_code_success,
} = require("../tools");
const User = require("../models/user.model");
const querystring = require("querystring");
const sanitize = require("mongo-sanitize");
const _ = require("lodash");

const UID_REGEX = /[A-Za-z0-9\-_]+/;
const ACCOUNTS_PER_PAGE = 10;

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
    (req, res, next) => {
        if (req.user) {
            send_code_error(res, 400, "auth/sign-in/already-signed-in");
        } else {
            next();
        }
    },
    passport.authenticate("local", {
        failWithError: true,
    }),
    (req, res) => {
        if (req.user) {
            send_code_success(res, 200, "auth/sign-in/success", {
                user: req.user,
            });
        } else {
            send_code_error(res, 401, "auth/sign-in/failure");
        }
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

const toPhoneNum = (x) => {
    const numOnly = x
        .split("")
        .filter((y) => !isNaN(Number(y)))
        .join("");

    if (numOnly.length !== 10) {
        throw new Error("Phone number not 10 digits");
    }

    return (
        numOnly.substr(0, 3) +
        "-" +
        numOnly.substr(3, 3) +
        "-" +
        numOnly.substr(6, 4)
    );
};

module.exports.create = [
    requiredBody(
        ["email", "password", "firstName", "lastName", "recaptchaToken"],
        undefined,
        "auth/sign-up/missing-%s"
    ),
    async (req, res) => {
        const {
            email,
            password,
            firstName: raw_firstName,
            lastName: raw_lastName,
            phone,
            recaptchaToken,
        } = req.body;

        if (!validator.isEmail(email)) {
            send_code_error(res, 400, "auth/sign-up/email-illegal-format");
            return;
        }

        const firstName = validator.escape(raw_firstName);
        const lastName = validator.escape(raw_lastName);

        let phoneNum = null;
        if (phone) {
            try {
                phoneNum = toPhoneNum(phone);
            } catch (e) {
                send_code_error(res, 400, "auth/sign-up/phone-invalid");
                return;
            }
        }

        let recaptchaResult = null;

        try {
            recaptchaResult = await axios.post(
                "https://www.google.com/recaptcha/api/siteverify",
                querystring.stringify({
                    secret:
                        process.env.RECAPTCHA_SECRET ||
                        require("../config/config").recaptcha.v2.secretKey,
                    response: recaptchaToken,
                })
            );
        } catch (e) {
            send_code_error(res, 502, "auth/sign-up/recaptcha-failed");
            return;
        }

        if (
            !recaptchaResult ||
            recaptchaResult.status !== 200 ||
            !recaptchaResult.data ||
            !recaptchaResult.data.success
        ) {
            send_code_error(res, 502, "auth/sign-up/recaptcha-failed");
            return;
        }

        // recaptcha passed!

        const user = new User({
            name: {
                first: firstName,
                last: lastName,
            },
            phone: phone ? phoneNum : undefined,
            email,
            password: User.hashPassword(password),
        });

        user.save()
            .then((resp) => {
                send_code_success(res, 201, "auth/sign-up/success");
            })
            .catch((err) => {
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
module.exports.admin.list = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const { filter: filterRaw, search } = req.body;

        let mongoFilter = {};

        if (filterRaw && !_.isEmpty(filterRaw)) {
            // Pick the one's we trust from filter to prevent leaks
            let filter =
                _.pick(filterRaw, "name.first", "name.last", "email") || {};

            // Add more fields here for regex-based matching (instead of strict equality)
            if (filter["name.first"]) {
                filter["name.first"] = new RegExp(filter["name.first"], "i");
            } else if (filter["name.last"]) {
                filter["name.last"] = new RegExp(filter["name.last"], "i");
            } else if (filter["email"]) {
                filter["email"] = new RegExp(filter["email"], "i");
            }

            mongoFilter = sanitize(filter);
        } else if (search) {
            if (typeof search !== "string" || /\$/.test(search)) {
                send_code_error(res, 400, "admin/user/list/invalid-search");
                return;
            }

            mongoFilter = {
                $or: [
                    {
                        "name.first": new RegExp(search, "i"),
                    },
                    {
                        "name.last": new RegExp(search, "i"),
                    },
                    {
                        email: new RegExp(search, "i"),
                    },
                ],
            };
        }

        const pageNum = Number(page) || 0;

        const count = await User.find(
            mongoFilter,
            "-password"
        ).countDocuments();

        User.find(mongoFilter, "-password", {
            limit: ACCOUNTS_PER_PAGE,
            skip: pageNum * ACCOUNTS_PER_PAGE,
        })
            .then((response) => {
                send_code_success(res, 200, "admin/user/list/success", {
                    data: response.map((x) =>
                        x.toObject({ virtuals: true, versionKey: false })
                    ),
                    page: pageNum,
                    count,
                });
            })
            .catch((err) => {
                send_code_error(res, 500, "admin/user/list/error", {
                    error: err,
                });
            });
    } catch (err) {
        send_code_error(res, 500, "admin/user/list/error", {
            error: err,
        });
    }
};

/** @type {express.RequestHandler} */
module.exports.admin.info = (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        send_code_error(res, 400, "admin/user/info/missing-uid");
        return;
    }

    if (!UID_REGEX.test(uid)) {
        send_code_error(res, 400, "admin/user/info/uid-illegal-format");
        return;
    }

    User.findById(uid, "-password")
        .then((response) => {
            send_code_success(res, 200, "admin/user/info/success", {
                data: response.toObject({ virtuals: true, versionKey: false }),
            });
        })
        .catch((err) =>
            send_code_error(res, 500, "admin/user/info/error", {
                error: err,
            })
        );
};

/** @type {express.RequestHandler} */
module.exports.admin.update = async (req, res) => {
    try {
        const { uid } = req.params;

        if (!req.body) {
            send_code_error(res, 400, "admin/user/update/body-required");
            return;
        }

        let newData = _.pick(
            sanitize(req.body),
            "name.first",
            "name.last",
            "email",
            "phone",
            "role"
        );

        const original = await User.findById(uid, "-password -_id");

        if (
            original.role.toString() !== newData.role.toString() &&
            req.user.role !== "Owner"
        ) {
            send_code_error(
                res,
                403,
                "admin/user/update/role-change-only-owner"
            );
            return;
        }

        newData = _.defaultsDeep(
            newData,
            original.toObject({ versionKey: false })
        );

        if (newData.phone) {
            try {
                newData.phone = toPhoneNum(newData.phone);
            } catch (e) {
                send_code_error(res, 400, "admin/user/update/phone-invalid");
                return;
            }
        }

        if (!newData.name.first || !newData.name.last || !newData.email) {
            send_code_error(res, 400, "admin/user/update/invalid-values");
            return;
        }

        await User.updateOne(
            {
                _id: uid,
            },
            {
                $set: newData,
            }
        );

        const newUser = await User.findById(uid, "-password");

        send_code_success(res, 200, "admin/user/update/success", {
            data: newUser.toObject({
                virtuals: true,
                versionKey: false,
            }),
        });
    } catch (err) {
        send_code_error(res, 500, "admin/user/update/error", {
            error: err,
        });
    }
};

/** @type {express.RequestHandler} */
module.exports.admin.delete = async (req, res) => {
    try {
        const { uid } = req.params;

        if (!req.user) {
            // we should be logged in, but because we are using user, make sure.
            throw {
                name: "NoPermsErr",
            };
        }

        if (!uid) {
            send_code_error(res, 400, "admin/user/delete/missing-uid");
            return;
        }

        // you need toString() to make it comparable
        if (req.user._id.toString() === uid.toString()) {
            send_code_error(res, 400, "admin/user/delete/cannot-delete-self");
            return;
        }

        const deleted = await User.findById(uid, "-password");

        if (!deleted) {
            send_code_error(res, 400, "admin/user/delete/no-user");
            return;
        }

        await User.findByIdAndDelete(uid);

        send_code_success(res, 200, "admin/user/delete/success", {
            data: deleted.toObject({ virtuals: true, versionKey: false }),
        });
    } catch (e) {
        console.error("Could not delete user:", e);
        send_code_error(res, 500, "admin/user/delete/error", {
            error: e,
        });
    }
};
