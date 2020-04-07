const passport = require("passport");
const _ = require("lodash");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const validator = require("validator").default;

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            (email, password, done) => {
                if (!validator.isEmail(email)) {
                    return done(null, false, {
                        message: "auth/attempt/email-illegal-format",
                    });
                }

                User.findOne(
                    {
                        email,
                    },
                    (err, res) => {
                        if (err) {
                            return done(err);
                        }

                        if (!res || !res.id) {
                            return done(null, false, {
                                message: "auth/attempt/failure",
                            });
                        }

                        if (!res.validPassword(password)) {
                            return done(null, false, {
                                message: "auth/attempt/failure",
                            });
                        }

                        return done(
                            null,
                            _.omit(res.toObject({ virtuals: true }), "password")
                        );
                    }
                );
            }
        )
    );

    passport.serializeUser((/** @type {User.IUserModel} */ user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, "-password", (err, res) => {
            if (err) {
                done(err);
            } else {
                if (res && res.id === id) {
                    done(null, res.toObject({ virtuals: true }));
                } else {
                    done(null, false);
                }
            }
        });
    });
};
