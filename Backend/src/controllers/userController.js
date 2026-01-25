const userModel = require('../models/userModel');
const pool = require('../config/db');

// Actualizar perfil propio (privado)
const bcrypt = require('bcrypt');
const updateProfile = async (req, res) => {
  try {
    const { nombre, rut, email, direccion, password } = req.body;
    let hashedPassword;
    let updateObj = { nombre, rut, email, direccion };
    if (password && password.trim() !== '') {
      console.log('Nuevo password recibido para actualizar:', password);
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hasheado:', hashedPassword);
      updateObj.password = hashedPassword;
      console.log('Se envió password hasheado a updateUser');
    } else {
      console.log('No se envió password a updateUser');
    }
    const updatedUser = await userModel.updateUser(req.user.id, updateObj);
    res.json({
      id: updatedUser.id,
      nombre: updatedUser.nombre || '',
      rut: updatedUser.rut || '',
      email: updatedUser.email,
      direccion: updatedUser.direccion,
      role: updatedUser.role,
      created_at: updatedUser.created_at
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};


// Obtener usuario por id (privado/admin)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, nombre, rut, email, role, direccion, created_at FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({
      id: result.rows[0].id,
      nombre: result.rows[0].nombre || '',
      rut: result.rows[0].rut || '',
      email: result.rows[0].email,
      role: result.rows[0].role,
      direccion: result.rows[0].direccion,
      created_at: result.rows[0].created_at
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Obtener perfil propio (privado)
const getProfile = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, rut, email, role, direccion, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({
      id: result.rows[0].id,
      nombre: result.rows[0].nombre || '',
      rut: result.rows[0].rut || '',
      email: result.rows[0].email,
      role: result.rows[0].role,
      direccion: result.rows[0].direccion,
      created_at: result.rows[0].created_at
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

module.exports = { getProfile, getUserById, updateProfile };