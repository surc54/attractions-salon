const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");

const UNIMPLEMENTED = (req, res) =>
    res.send({
        status: "fail",
        message: "Unimplemented feature.",
    });

// Get list of all users
router.get("/", UserController.admin.list);

// Get info on one user
router.get("/:uid", UserController.admin.info);

module.exports = router;
