const express = require("express");
const Router = express.Router();
const { permitRole } = require("../../tools");
const controller = require("../../controllers/ez-setting.controller");

// get setting.
Router.get("/", controller.get);

// set setting.
Router.put("/", permitRole("Admin", "Owner"), ...controller.set);

module.exports = Router;
