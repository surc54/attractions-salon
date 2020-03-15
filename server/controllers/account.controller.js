const config = require("../config/config");
const validator = require("validator").default;
const { std_error, requiredBody } = require("../tools");

const UID_REGEX = /[A-Za-z0-9\-_]+/;

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
            res.send(std_error("Email format incorrect."));
            return;
        }

        const firstName = raw_firstName;
        const lastName = raw_lastName;

        // fb.auth()
        //     .createUser({
        //         email,
        //         password,
        //         emailVerified: false,
        //         displayName: firstName + " " + lastName,
        //     })
        //     .then(resp => {
        //         res.send({
        //             status: "ok",
        //             user: resp,
        //         });
        //     })
        //     .catch(err =>
        //         res.send(std_error("Could not create account.", err))
        //     );
    }
);

module.exports.admin = {};

module.exports.admin.info = (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        res.send(std_error("Parameter uid missing."));
        return;
    }

    if (!UID_REGEX.test(uid)) {
        res.send(std_error("Parameter uid is in an invalid format."));
        return;
    }

    // fb.auth()
    //     .getUser(uid)
    //     .then(response => {
    //         res.send(response);
    //     })
    //     .catch(err => res.send(std_error("Could not get user", err)));
};
