// backend/models/Materiel.js
const mongoose = require('mongoose');

const materielSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Materiel', materielSchema);
