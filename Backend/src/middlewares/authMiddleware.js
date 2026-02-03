const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('[AUTH] Authorization header:', authHeader);
  console.log('[AUTH] Token:', token);
  if (!token) {
    console.log('[AUTH] No token provided');
    return res.status(401).json({ error: 'Token requerido' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('[AUTH] Token inválido:', err.message);
      return res.status(403).json({ error: 'Token inválido' });
    }
    console.log('[AUTH] Usuario autenticado:', user);
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  console.log('[ADMIN] Usuario recibido en isAdmin:', req.user);
  if (req.user && req.user.role === 'admin') {
    console.log('[ADMIN] Usuario es admin, acceso permitido');
    return next();
  }
  console.log('[ADMIN] Acceso denegado, usuario no es admin');
  return res.status(403).json({ error: 'Solo administradores' });
};

module.exports = { authenticateToken, isAdmin };