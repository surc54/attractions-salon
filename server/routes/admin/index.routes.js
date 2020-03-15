const express = require("express");
const router = express.Router();
const accountsRouter = require("./account.routes");

router.use("/account", accountsRouter);

module.exports = router;
