const express = require("express");
const router = express.Router();
const accountsRouter = require("./account.routes");

// TODO: Authentication check when using ADMIN API

router.use("/account", accountsRouter);

module.exports = router;
