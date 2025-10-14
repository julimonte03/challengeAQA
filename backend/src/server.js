require('dotenv').config(); // carga variables de .env en process.env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json()); // parsea JSON

// Rutas con prefijo /api
app.use('/api', authRoutes);
app.use('/api/messages', messagesRoutes);

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aqa-challenge';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Backend escuchando en http://localhost:${PORT}`));
    
    
  })
  .catch(err => {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  });
