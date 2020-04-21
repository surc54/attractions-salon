const mongoose = require("mongoose");
//const serviceItem = require("./item.model");

const serviceGroup = new mongoose.Schema({
    groupName: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, min: 0 },
    description: { type: String },
    subtitle: { type: String },
    imgURL: {
        type: String,
        default:
            "https://www.lakegastonrentals.com/images/blog/Time-for-something-new-switch.jpg",
        // temporary, may have copyright
    },
});

module.exports = mongoose.model("services", serviceGroup);
