const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


// Registro de usuario
const register = async (req, res) => {
  console.log('Body recibido en registro:', req.body);
  const { nombre, rut, email, password, direccion } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(nombre, rut, email, hashedPassword, 'cliente', direccion);
    res.status(201).json({
      id: user.id,
      nombre: user.nombre,
      rut: user.rut,
      email: user.email,
      direccion: user.direccion,
      role: user.role,
      created_at: user.created_at
    });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(400).json({ error: 'Usuario ya existe o datos inválidos' });
  }
};

// Login de usuario
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    // DEBUG: Mostrar valores recibidos y hash de la base
    console.log('Login intento:', email, password, user ? user.password : 'NO USER');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        rut: user.rut,
        email: user.email,
        direccion: user.direccion,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (err) {
    console.error('ERROR EN LOGIN:', err);
    res.status(500).json({ error: 'Error al iniciar sesión', detalle: err.message });
  }
};

// Recuperar/actualizar contraseña
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log('Intentando recuperar contraseña para:', email);
  if (!email || !password) {
    console.log('Faltan datos');
    return res.status(400).json({ error: 'Faltan datos' });
  }
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await userModel.updateUser(user.id, {
      nombre: user.nombre,
      rut: user.rut,
      email: user.email,
      direccion: user.direccion,
      password: hashedPassword
    });
    console.log('Resultado actualización:', updated);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error al actualizar contraseña:', err);
    res.status(500).json({ error: 'No se pudo actualizar la contraseña' });
  }
};

module.exports = { register, login, resetPassword };