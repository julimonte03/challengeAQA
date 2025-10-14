const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Crear mensaje
router.post('/', async (req, res) => {
  const { user, text } = req.body || {};
  if (!user || !text) return res.status(400).json({ ok: false, message: 'Missing user or text' });

  try {
    const m = new Message({ user, text });
    await m.save();
    return res.json({ ok: true, message: m });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// Obtener mensajes (history)
router.get('/', async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: 1 }).limit(200);
    return res.json({ ok: true, messages: msgs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

module.exports = router;
