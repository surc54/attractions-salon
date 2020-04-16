const express = require("express");
const PhotoController = require("../controllers/photos.controller");
const router = express.Router();

const UNIMPLEMENTED = {
    status: "fail",
    message: "Unimplemented feature.",
};

{/**afdgdfbdfdbfd */}

// List all services
router.get("/", PhotoController.list);

// Get info about specific photo
router.get("/:id", PhotoController.read);

// Add photo
router.post("/", PhotoController.create);

// Modify photo
router.put("/:id", PhotoController.update);

// Remove photo
router.delete("/:id", PhotoController.delete);

module.exports = router;
