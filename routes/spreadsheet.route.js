const express = require('express');
const SpreadSheetController = require('../controllers/spreadsheet.controller')

const router = express.Router(); 
const spreadsheet = new SpreadSheetController();


router.get('/', spreadsheet.get)

module.exports = router;