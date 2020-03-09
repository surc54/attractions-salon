const express = require("express");
const ServiceController = require("../controllers/service.controllers");
const router = express.Router();

const UNIMPLEMENTED = {
    status: "fail",
    message: "Unimplemented feature.",
};

// List all services
router.get("/", ServiceController.list);

// Get info about specific service
router.get("/:id", (req, res) => {
    res.send(UNIMPLEMENTED);
});

// Add service
router.put("/", (req, res) => {
    res.send(UNIMPLEMENTED);
});

// Modify service
router.post("/:id", (req, res) => {
    res.send(UNIMPLEMENTED);
});

// Remove service
router.delete("/:id", (req, res) => {
    res.send(UNIMPLEMENTED);
});

module.exports = router;
