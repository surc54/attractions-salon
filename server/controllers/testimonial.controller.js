// const fs = require("fs");
// const path = require("path");

const testimonial = require("../models/testimonial.model.js");

// For User side

module.exports.list = (req, res) => {
    testimonial
        .find({})
        .then((value) => {
            res.send({
                status: "ok",
                data: value,
            });
        })
        .catch(() => res.status(200).send("Error when finding testimonials"));
};

module.exports.create = (req, res) => {
    const data = new testimonial({
        approved: req.body.approved,
        name: req.body.name,
        rating: req.body.rating,
        feedback: req.body.feedback,
    });

    data.save()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(404).send({
                error: err.message || "Error: testimonial cannot be added",
            });
        });
};

// module.exports.delete = (req, res) => {};
