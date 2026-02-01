/**
 * api.test.js
 *
 * Pruebas automáticas para la API del backend de Clicktech.
 *
 * Este archivo utiliza Jest y Supertest para validar los endpoints principales:
 *   - Registro y login de usuarios (auth)
 *   - Listado de productos
 *
 * ¿Cómo ejecutarlo?
 * - Ejecuta `npm test` o `npx jest` en la carpeta Backend.
 * - Asegúrate de tener la base de datos y el backend configurados correctamente.
 *
 * Puedes agregar más tests para cubrir otros endpoints o casos de negocio.
 */

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('API Auth', () => {
  it('debe registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  it('no debe registrar usuario duplicado', async () => {
    await request(app).post('/api/auth/register').send({ username: 'testuser2', password: 'testpass' });
    const res = await request(app).post('/api/auth/register').send({ username: 'testuser2', password: 'testpass' });
    expect(res.statusCode).toBe(400);
  });

  it('debe loguear usuario y devolver token', async () => {
    await request(app).post('/api/auth/register').send({ username: 'testlogin', password: 'testpass' });
    const res = await request(app).post('/api/auth/login').send({ username: 'testlogin', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('API Products', () => {
  it('debe devolver productos (puede estar vacío)', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await pool.end();
});
