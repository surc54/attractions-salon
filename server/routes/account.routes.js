const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/account.controller");

const UNIMPLEMENTED = (req, res) =>
    res.send({
        status: "fail",
        message: "Unimplemented feature.",
    });

// Get current account info
router.get("/", UNIMPLEMENTED);

// Sign in
router.post("/", UNIMPLEMENTED);

// Sign up
router.put("/", AccountController.create);

// Delete account (self)
router.delete("/", UNIMPLEMENTED);

module.exports = router;
