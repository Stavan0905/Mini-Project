const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// api dashboard
router.get('/api/dashboard', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
