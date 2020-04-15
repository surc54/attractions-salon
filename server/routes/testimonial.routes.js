const express = require("express");
const TestimonialController = require("../controllers/testimonial.controller");
const router = express.Router();

// List all testimonials (default anyway)
router.get("/", TestimonialController.list);

// Add testimonial
router.post("/", TestimonialController.create);

module.exports = router;
