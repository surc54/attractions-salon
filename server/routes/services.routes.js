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
router.get("/:id", ServiceController.read);

// Add service
router.post("/", ServiceController.create);

// Modify service
router.put("/:id", ServiceController.update);

// Remove service
router.delete("/:id", ServiceController.delete);

module.exports = router;
