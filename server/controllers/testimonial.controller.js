const testimonial = require("../models/testimonial.model.js");
const { send_code_error, send_code_success } = require("../tools");

// For User side

module.exports.list = async (req, res) => {
    await testimonial
        .find({})
        .then((value) => {
            send_code_success(res, 200, "admin/testimonial/list/success", {
                status: "ok",
                data: value,
            });
        })
        .catch(() => send_code_error(res, 404, "admin/testimonial/list/error"));
};

module.exports.create = async (req, res) => {
    const data = new testimonial({
        id: req.body.id,
        approved: req.body.approved,
        name: req.body.name,
        rating: req.body.rating,
        feedback: req.body.feedback,
    });

    await data.save()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(404).send({
                error: err.message || "Error: testimonial cannot be added",
            });
        });
};

// For admin side
module.exports.admin = {};
module.exports.admin.list = async (req, res) => {
    await testimonial
        .find({})
        .then((value) => {
            send_code_success(res, 200, "admin/testimonial/list/success", {
                status: "ok",
                data: value,
            });
        })
        .catch(() => send_code_error(res, 404, "admin/testimonial/list/error"));
};

module.exports.admin.delete = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            send_code_error(res, 400, "admin/testimonial/delete/missing-id");
            return;
        }

        const deleted = await testimonial.findById(id);

        if (!deleted) {
            send_code_error(res, 400, "admin/testimonial/delete/error");
            return;
        }

        await testimonial.findByIdAndDelete(id);

        send_code_success(res, 200, "admin/testimonial/delete/success", {
            data: deleted.toObject({ virtuals: true, versionKey: false }),
        });
    } catch (e) {
        console.error("Could not delete testimonial: ", e);
        send_code_error(res, 500, "admin/testimonial/delete/error", {
            error: e,
        });
    }
};
