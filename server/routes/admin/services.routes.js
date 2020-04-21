const express = require("express");
const router = express.Router();
const ServiceController = require("../../controllers/service.controllers");

//const UNIMPLEMENTED = (req, res) =>
//    res.status(501).send({
//        status: "fail",
//        message: "Unimplemented feature.",
//    });

/**
 * Routes:
 *  - Delete - DELETE
 *  - Create - PUT
 *  - Update - POST
 */

// create new service
router.put("/", ServiceController.admin.create);

// update new service
router.post("/:id", ServiceController.admin.update);

// delete service
router.delete("/:id", ServiceController.admin.delete);

module.exports = router;