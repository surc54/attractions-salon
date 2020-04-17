const testimonial = require("../models/testimonial.model.js");
const { send_code_error, send_code_success } = require("../tools");
const _ = require("lodash");

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

    await data
        .save()
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
        const { uid } = req.params;

        if (!uid) {
            send_code_error(res, 400, "admin/testimonial/delete/missing-id");
            return;
        }

        const deleted = await testimonial.findById(uid);

        if (!deleted) {
            send_code_error(res, 400, "admin/testimonial/delete/error");
            return;
        }

        await testimonial.findByIdAndDelete(uid);

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

module.exports.admin.update = async (req, res) => {
    try {
        const { uid } = req.params;
        // console.log("body:", req.body);
        // console.log("params:", req.params);

        if (!req.body) {
            send_code_error(res, 400, "admin/testimonial/update/body-required");
            return;
        }

        const updated = await testimonial.findById(uid);

        if (!updated) {
            send_code_error(res, 400, "admin/testimonial/update/error");
            return;
        }

        await testimonial.updateOne({ _id: uid }, { approved: !req.body.approved });

        send_code_success(res, 200, "admin/testimonial/update/success", {
            data: updated.toObject({
                virtuals: true,
                versionKey: false,
            }),
        });
    } catch (err) {
        send_code_error(res, 500, "admin/testimonial/update/error", {
            error: err,
        });
    }
};