const mongoose = require("mongoose");

const photo = new mongoose.Schema({
    id: { type: Number},
    imgURL: {
        type: String,
        default:
            "https://www.lakegastonrentals.com/images/blog/Time-for-something-new-switch.jpg",
        // temporary, may have copyright
    },
});


module.exports = mongoose.model("photos", photo);
