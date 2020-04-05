const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");

const UNIMPLEMENTED = (req, res) =>
    res.status(501).send({
        status: "fail",
        message: "Unimplemented feature.",
    });

/**
 * Required Admin Functionality:
 *  x List users
 *      x WITH FILTER
 *  x Get info on certain user
 *  x Update certain user
 *  - Execute admin task
 *      - Email certain user
 *      - Email multiple users
 *      - Text certain user
 *      - Text multiple users
 *      x Delete certain user
 *
 * Functionality from other pages
 *  - Get appointments for user
 *
 */

// Get list of all users
router.get("/", UserController.admin.list);
router.post("/", UserController.admin.list);

// Get info on one user
router.get("/:uid", UserController.admin.info);

// Update user
router.post("/:uid", UserController.admin.update);

// Delete user
router.delete("/:uid", UserController.admin.delete);

module.exports = router;
