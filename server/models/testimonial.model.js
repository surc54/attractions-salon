const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema(
    {
        id: Number,
        approved: Boolean,
        name: String,
        rating: Number,
        feedback: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("testimonial", TestimonialSchema);
