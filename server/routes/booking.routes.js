const express = require("express");
const BookingController = require("../controllers/booking.controllers");
const router = express.Router();

// List all bookings
router.get("/", BookingController.list);

// Get info about specific booking
router.get("/:id", BookingController.read);

// Add booking
router.post("/", BookingController.create);

// Modify booking
router.put("/:id", BookingController.update);

// Remove booking
router.delete("/:id", BookingController.delete);

module.exports = router;