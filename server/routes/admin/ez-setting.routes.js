const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/ez-setting.controller");

// get setting.
Router.get("/", controller.get);

// set setting.
Router.put("/", ...controller.set);

module.exports = Router;
