require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const Message = require('./models/Message');

const app = express();

// Configuración de CORS explícita para React
app.use(cors({
  origin: 'http://localhost:5173', // origen del frontend
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

// Parseo de JSON
app.use(express.json());

// Logger de todas las requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Endpoint para resetear la base (Cypress)
app.post("/test/reset", async (req, res) => {
  const messages = req.body.messages || [];
  console.log("Reset messages:", messages); // 👈 log para ver mensajes que llegan
  try {
    await Message.deleteMany({});
    await Message.insertMany(messages);
    res.status(200).send({ ok: true });
  } catch (err) {
    console.error("Error al resetear mensajes:", err);
    res.status(500).send({ ok: false, message: 'Error reset messages' });
  }
});

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
