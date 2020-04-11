const express = require("express");
const router = express.Router();
const accountsRouter = require("./account.routes");
const ezSettingsRouter = require("./ez-setting.routes");

// TODO: Authentication check when using ADMIN API

router.use("/account", accountsRouter);
router.use("/ez-setting", ezSettingsRouter);

module.exports = router;
