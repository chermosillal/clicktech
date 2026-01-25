const express = require('express');
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, isAdmin, createProduct);
router.put('/:id', authenticateToken, isAdmin, updateProduct);
router.delete('/:id', authenticateToken, isAdmin, deleteProduct);

module.exports = router;