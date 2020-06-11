const express = require("express");
const BuyController = require("../controllers/buy.controller");

const router = express.Router();
const buy = new BuyController();

router.post("/", buy.create);
router.get("/", buy.get);

module.exports = router;
