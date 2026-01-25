
const pool = require('../config/db');


// Actualizar usuario por id
async function updateUser(id, { nombre, rut, email, direccion, password }) {
  let query = 'UPDATE users SET nombre = $1, rut = $2, email = $3, direccion = $4';
  const params = [nombre, rut, email, direccion];
  if (password && password !== 'undefined') {
    query += ', password = $5';
    params.push(password);
    query += ' WHERE id = $6 RETURNING id, nombre, rut, email, direccion, role, created_at';
    params.push(id);
  } else {
    query += ' WHERE id = $5 RETURNING id, nombre, rut, email, direccion, role, created_at';
    params.push(id);
  }
  const result = await pool.query(query, params);
  return result.rows[0];
}


// Crear usuario
async function createUser(nombre, rut, email, password, role, direccion) {
  const result = await pool.query(
    'INSERT INTO users (nombre, rut, email, password, role, direccion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, rut, email, role, created_at, direccion',
    [nombre, rut, email, password, role, direccion]
  );
  return result.rows[0];
}

// Buscar usuario por email
async function findUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

module.exports = { createUser, findUserByEmail, updateUser };
