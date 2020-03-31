const express = require("express");
const ServiceController = require("../controllers/service.controllers");
const router = express.Router();

const UNIMPLEMENTED = {
    status: "fail",
    message: "Unimplemented feature.",
};

{/**afdgdfbdfdbfd */}

// List all services
router.get("/", ServiceController.list);

// Get info about specific service
router.get("/:id", ServiceController.read);

// Add service
router.post("/", ServiceController.create); // unsure if POST = create or update

// Modify service
router.put("/:id", ServiceController.update);

// Remove service
router.delete("/:id", ServiceController.delete);

module.exports = router;
