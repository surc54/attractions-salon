const express = require("express");
const router = express.Router();
const accountsRouter = require("./account.routes");
const { permitRole } = require("../../tools");
const ezSettingsRouter = require("./ez-setting.routes");

router.use(permitRole("Admin", "Owner"));

router.use("/account", accountsRouter);
router.use("/ez-setting", ezSettingsRouter);

module.exports = router;
