const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      req.session.user = user;
      return res.json({ success: true, role: user.role });
    } else {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
