const mongoose = require('mongoose');
const serviceItem = require("./item.model");


const serviceGroup = new mongoose.Schema({
  groupName: {type: String, required: true},
  items: {type: [serviceItem.schema], required: true},
});

module.exports = mongoose.model('services', serviceGroup);
