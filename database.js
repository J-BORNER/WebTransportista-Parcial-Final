const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
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

// Verificar conexión y crear tabla
const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado a PostgreSQL');
    
    await client.query(createTableQuery);
    console.log('✅ Tabla "conductores" verificada/creada');
    
    client.release();
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error.message);
    process.exit(1);
  }
};

initializeDatabase();

module.exports = pool;