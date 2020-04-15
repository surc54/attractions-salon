const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema(
    {
        id: String,
        approved: Boolean,
        name: String,
        rating: Number,
        feedback: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("testimonial", TestimonialSchema);
