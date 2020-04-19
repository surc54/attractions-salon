const mongoose = require("mongoose");
const serviceItem = require("./item.model");
const userSchema = require("./user.model");

const appointment = new mongoose.Schema({
    services: { type: [serviceItem], required: true},
    bookingNum: { type: String, unique: true },
    name:  { type: String, required: true },
    date:  { type: Date, required: true },
    cost:  { type: Number, required: true },
    status: {
        type: String,
        enum: ["Cancelled", "Pending", "Scheduled", "Completed", "Past Due"],
        default: "Pending",
    },
    user:  { type: [userSchema] },
    phone: { type: String },
});

module.exports = mongoose.model("appointments", appointment);