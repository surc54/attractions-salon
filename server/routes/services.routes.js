const express = require("express");
const ServiceController = require("../controllers/service.controllers");
const router = express.Router();

const UNIMPLEMENTED = {
    status: "fail",
    message: "Unimplemented feature.",
};

// List all services
router.get("/", ServiceController.list);

router.get("/:id", ServiceController.read);

module.exports = router;
