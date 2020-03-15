const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const schema = new Schema({
    name: {
        first: {
            type: String,
            trim: true,
            required: [true, "mongo/user/first-name/missing"],
        },
        last: {
            type: String,
            trim: true,
            required: [true, "mongo/user/last-name/missing"],
        },
    },
    email: {
        type: String,
        trim: true,
        required: [true, "mongo/user/email/missing"],
        index: true,
        unique: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        match: [/\d{3}-\d{3}-\d{4}/, "mongo/user/phone/invalid-format"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "mongo/user/password/missing"],
        minlength: 60,
        maxlength: 60,
        match: [
            /[\.\/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\$]{60}/,
            "mongo/user/password/invalid",
        ],
    },
    role: {
        type: String,
        enum: ["Guest", "Admin", "Owner"],
        default: "Guest",
    },
});

// Prevent mongoose from auto indexing because it causes performance
// impact on app start up (because mongoose does that.)
// Uncomment below to disable autoIndex.
// schema.set('autoIndex', false);

// Do not convert these methods to the ES6 arrow function
// Function binding is necessary for this to work, and the
// arrow functions do not have this capability.
schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

schema.methods.setPassword = function(password) {
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);

    this.password = hash;
};

schema.methods.isGuest = function() {
    return this.role === "Guest";
};

schema.methods.isAdmin = function() {
    return this.role === "Admin";
};

schema.methods.isOwner = function() {
    return this.role === "Owner";
};

// If calling .toJSON() anywhere, include option "virtuals": true
// to include virtuals
schema.virtual("fullName").get(function() {
    return this.name.first + " " + this.name.last;
});

module.exports = model("user", schema);
