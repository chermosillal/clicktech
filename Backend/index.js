
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3001;

// Probar conexión a la base de datos al iniciar el servidor
pool.query('SELECT NOW()')
  .then(res => {
    console.log('Conexión a la base de datos exitosa:', res.rows[0].now);
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1);
  });
