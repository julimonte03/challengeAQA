const express = require('express');
const router = express.Router();

router.post("/login", (req, res) => {
  console.log("Login request body:", req.body); // 👈 log del request

  const { username, password } = req.body;
  if (username === "testuser" && password === "Password123") {
    console.log("Login OK para usuario:", username);
    return res.json({ ok: true, user: username });
  } else {
    console.log("Login fallido para usuario:", username);
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
  }
});

module.exports = router;
