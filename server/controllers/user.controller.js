const express = require("express");
const config = require("../config/config");
const validator = require("validator").default;
const { std_error, requiredBody, mongoErrors } = require("../tools");
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

module.exports.info = (req, res) => {
    // check if logged in.
};

module.exports.create = requiredBody(
    ["email", "password", "firstName", "lastName"],
    "Parameter %s is missing",
    false,
    (req, res) => {
        const {
            email,
            password,
            firstName: raw_firstName,
            lastName: raw_lastName,
        } = req.body;

        if (!validator.isEmail(email)) {
            res.status(400).send(std_error("Email format incorrect."));
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
                res.status(201).send({
                    status: "ok",
                    message: "Signed up successfully",
                });
            })
            .catch(err => {
                res.status(500).send(
                    std_error(
                        err && err.name && err.name === "MongoError" && err.code
                            ? mongoErrors.users[err.code]
                            : err,
                        "Could not sign up user"
                    )
                );
                console.error("Could not save user to database:", err);
            });
    }
);

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
            res.status(200).send({
                status: "ok",
                data: response,
            });
        })
        .catch(err => {
            res.status(500).send(std_error(err, "Could not get users list"));
        });
};

/** @type {express.RequestHandler} */
module.exports.admin.info = (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        res.status(400).send(std_error("Parameter uid missing."));
        return;
    }

    if (!UID_REGEX.test(uid)) {
        res.status(400).send(
            std_error("Parameter uid is in an invalid format.")
        );
        return;
    }

    User.findById(uid, "-password")
        .then(response => {
            res.status(200).send({
                status: "ok",
                data: response,
            });
        })
        .catch(err =>
            res.status(500).send(std_error(err, "Could not get user"))
        );
};
