const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

const UNIMPLEMENTED = (req, res) =>
    res.status(501).send({
        status: "fail",
        message: "Unimplemented feature.",
    });

// Get current account info
router.get("/", UserController.info);

// Sign in
router.post("/", ...UserController.signIn);

// Sign up
router.put("/", ...UserController.create);

// Sign out
router.get("/logout", UserController.signOut);

// Delete account (self)
router.delete("/", UNIMPLEMENTED);

module.exports = router;
