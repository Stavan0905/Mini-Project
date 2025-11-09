const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }, // local path to poster
});

module.exports = mongoose.model('Movie', MovieSchema);
