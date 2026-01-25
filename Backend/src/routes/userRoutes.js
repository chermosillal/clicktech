
const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { getProfile, updateProfile, getUserById } = require('../controllers/userController');
const router = express.Router();

// Obtener perfil del usuario autenticado
router.get('/me', authenticateToken, getProfile);
// Actualizar perfil del usuario autenticado
router.put('/me', authenticateToken, updateProfile);
// Obtener usuario por id (opcional, admin)
router.get('/:id', authenticateToken, getUserById);

module.exports = router;

router.get('/me', authenticateToken, getProfile);
router.get('/:id', authenticateToken, getUserById);

module.exports = router;