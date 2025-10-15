const express = require('express');
const router = express.Router();

// usuarios hardcodeados 
const USERS = { testuser: 'Password123', testuser2: 'Password2' };

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ ok: false, message: 'Invalid credentials' });

  if (USERS[username] && USERS[username] === password) {
    // devolver token falso 
    return res.json({ ok: true, user: username, token: 'fake-token' });
  }
  return res.status(401).json({ ok: false, message: 'Invalid credentials' });
});

module.exports = router;
