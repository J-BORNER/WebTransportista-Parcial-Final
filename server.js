const express = require('express');
const pool = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Middleware para CORS (permite peticiones desde cualquier origen)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// 📌 ENDPOINT 1: Registrar conductor (POST)
app.post('/conductores', async (req, res) => {
  try {
    const { nombre, apellido, licencia, telefono } = req.body;

    // Validar campos requeridos
    if (!nombre || !apellido || !licencia) {
      return res.status(400).json({ 
        error: 'Nombre, apellido y licencia son obligatorios' 
      });
    }

    const query = `
      INSERT INTO conductores (nombre, apellido, licencia, telefono)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [nombre, apellido, licencia, telefono || null];
    const result = await pool.query(query, values);

    res.status(201).json({
      mensaje: 'Conductor registrado exitosamente',
      conductor: result.rows[0]
    });

  } catch (error) {
    if (error.code === '23505') { // Violación de unique constraint
      res.status(400).json({ error: 'La licencia ya está registrada' });
    } else {
      console.error('Error registrando conductor:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

// 📌 ENDPOINT 2: Consultar conductor por licencia (GET)
app.get('/conductores/:licencia', async (req, res) => {
  try {
    const { licencia } = req.params;

    if (!licencia) {
      return res.status(400).json({ error: 'Licencia es requerida' });
    }

    const query = 'SELECT * FROM conductores WHERE licencia = $1';
    const result = await pool.query(query, [licencia]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conductor no encontrado' });
    }

    res.json({ conductor: result.rows[0] });

  } catch (error) {
    console.error('Error consultando conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 📌 ENDPOINT 3: Listar todos los conductores (GET)
app.get('/conductores', async (req, res) => {
  try {
    const query = 'SELECT * FROM conductores ORDER BY id DESC';
    const result = await pool.query(query);

    res.json({ 
      total: result.rows.length,
      conductores: result.rows 
    });

  } catch (error) {
    console.error('Error listando conductores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 📌 ENDPOINT 4: Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'OK', 
      message: 'API y base de datos funcionando correctamente',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Error en la base de datos',
      error: error.message 
    });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🚗 API Transportista funcionando!',
    endpoints: {
      registrar_conductor: 'POST /conductores',
      consultar_conductor: 'GET /conductores/:licencia',
      listar_conductores: 'GET /conductores',
      health_check: 'GET /health'
    },
    ejemplo_registro: {
      nombre: "Ejemplo",
      apellido: "Usuario", 
      licencia: "LIC123456",
      telefono: "555-1234"
    }
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});