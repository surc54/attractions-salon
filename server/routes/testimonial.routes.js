const express = require("express");
const TestimonialController = require("../controllers/testimonial.controller");
const router = express.Router();

// List all testimonials (default anyway)
router.get("/", TestimonialController.list);

// Add testimonial
router.post("/", TestimonialController.create);


// This is for admin page ****************

// Remove testimonial
// router.delete("/:id", TestimonialController.delete);

module.exports = router;
