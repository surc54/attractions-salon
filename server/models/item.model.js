const mongoose = require('mongoose');

const serviceItem = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, min: 0},
    description: {type: String},
    subtitle: {type: String},
    imgURL: {type: String, default:
        "https://www.lakegastonrentals.com/images/blog/Time-for-something-new-switch.jpg"    
        // temporary, may have copyright
    },

});

{/**afdgdfbdfdbfd */}

module.exports = mongoose.model('serviceItem', serviceItem);