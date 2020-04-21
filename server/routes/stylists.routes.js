const express = require("express");
const StylistController = require("../controllers/stylist.controller");
const router = express.Router();

const UNIMPLEMENTED = {
    status: "fail",
    message: "Unimplemented feature.",
};

// List all stylists
router.get("/", StylistController.list);

// Get info about specific photo
router.get("/:id", StylistController.read);

// Add photo
// router.post("/:id", StylistController.update);

// Modify photo
router.put(StylistController.create);

// Remove photo
// router.delete("/:id", StylistController.delete);

module.exports = router;
