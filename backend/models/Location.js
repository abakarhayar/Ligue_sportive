// backend/models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materiel: { type: mongoose.Schema.Types.ObjectId, ref: 'Materiel', required: true },
  DateDebut: { type: Date, required: true },
  DateFin: { type: Date, required: true },
  returned: { type: Boolean, default: false }
});

module.exports = mongoose.model('Location', locationSchema);
