const express = require('express');
const pool = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ENDPOINTS (usar el mismo código que te pasé anteriormente)
// ... pegar aquí todos los endpoints del código anterior ...

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});