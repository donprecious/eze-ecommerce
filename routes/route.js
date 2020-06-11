const express = require("express");
const buyRoute = require("./buy.route");
const sellRoute = require("./sell.route");
const spreadsheetRoute = require("./spreadsheet.route");

const router = express.Router();

router.use("/buy", buyRoute);
router.use("/sell", sellRoute);

router.use("/spreadsheet", spreadsheetRoute);

module.exports = router;
