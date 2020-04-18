const mongoose = require("mongoose");

const stylist= new mongoose.Schema({
    name: { type: String, required: true },
    imgURL: {
        type: String,
        default:
            "https://www.lakegastonrentals.com/images/blog/Time-for-something-new-switch.jpg",
        // temporary, may have copyright
    },
});


module.exports = mongoose.model("stylist", stylist);
