const express = require("express");
const router = express.Router();
const accountsRouter = require("./account.routes");
const testimonialRouter = require("./testimonial.routes");
const servicesRouter = require("./services.routes");
const { permitRole } = require("../../tools");

router.use(permitRole("Admin", "Owner"));

router.use("/account", accountsRouter);
router.use("/testimonial", testimonialRouter);
router.use("/services", servicesRouter);

module.exports = router;
