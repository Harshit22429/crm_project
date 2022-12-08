const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController.js');

router.get('/tlreport/:parentId', reportController.getCompleteReport)

module.exports = router;