const express = require("express");
const router = express.Router();
const accountsRouter = require("./account.routes");
// const testimonialRouter = require("./testimonial.routes");
const { permitRole } = require("../../tools");

router.use(permitRole("Admin", "Owner"));

router.use("/account", accountsRouter);
// router.use("/testimonial", testimonialRouter);

module.exports = router;
