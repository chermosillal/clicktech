const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getOrders);

module.exports = router;