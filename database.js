const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Crear tabla si no existe
const createTableQuery = `
CREATE TABLE IF NOT EXISTS conductores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  licencia VARCHAR(20) UNIQUE NOT NULL,
  telefono VARCHAR(15),
  fecha_registro DATE DEFAULT CURRENT_DATE
);
`;

pool.query(createTableQuery)
  .then(() => console.log('✅ Tabla conductores verificada/creada'))
  .catch(err => console.error('❌ Error creando tabla:', err));

module.exports = pool;