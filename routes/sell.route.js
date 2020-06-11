const express = require("express");
const SellController = require("../controllers/sell.controller");

const router = express.Router();
const sell = new SellController();

router.post("/", sell.create);
router.get("/", sell.get);

module.exports = router;
