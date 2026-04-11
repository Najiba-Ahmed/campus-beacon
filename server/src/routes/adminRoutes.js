const express = require('express');
const router = express.Router();

const verifyEmail = require('../middleware/verifyEmail');
const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');

router.get('/dashboard', verifyEmail, isAdmin, adminController.getDashboardData);
router.put('/items/:itemId/hide', verifyEmail, isAdmin, adminController.hideItem);
router.put('/items/:itemId/unhide', verifyEmail, isAdmin, adminController.unhideItem);
router.delete('/items/:itemId', verifyEmail, isAdmin, adminController.deleteItem);

module.exports = router;