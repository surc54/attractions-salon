const { Schema, model } = require("mongoose");

const schema = new Schema({
    key: {
        type: String,
        trim: true,
        required: [true, "mongo/ez-settings/key-missing"],
        index: true,
        unique: true,
        match: /^[A-Za-z\-_]+$/,
    },
    value: {
        type: String,
        required: [true, "mongo/ez-settings/value-missing"],
        trim: true,
    },
});

// Prevent mongoose from auto indexing because it causes performance
// impact on app start up (because mongoose does that.)
// Uncomment below to disable autoIndex.
// schema.set('autoIndex', false);

module.exports = model("ez-setting", schema);
