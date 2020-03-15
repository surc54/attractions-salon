const express = require("express");
const router = express.Router();
const AccountController = require("../../controllers/account.controller");

const UNIMPLEMENTED = (req, res) =>
    res.send({
        status: "fail",
        message: "Unimplemented feature.",
    });

// Get list of all users
router.get("/", UNIMPLEMENTED);

// Get info on one user
router.get("/:uid", AccountController.admin.info);

module.exports = router;
