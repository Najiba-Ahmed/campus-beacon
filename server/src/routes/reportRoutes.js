const express = require('express');
const router = express.Router();
const verifyEmail = require('../middleware/verifyEmail');
const reportController = require('../controllers/reportController');

router.post('/:itemId', verifyEmail, reportController.reportItem);

module.exports = router;