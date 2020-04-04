const express = require("express");
const router = express.Router();
const accountsRouter = require("./account.routes");
const { permitRole } = require("../../tools");

router.use(permitRole("Admin", "Owner"));

router.use("/account", accountsRouter);

module.exports = router;
