// models/Devolucion.js
const mongoose = require('mongoose');

const devolucionSchema = new mongoose.Schema({
  venta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VentasModel',
    required: true
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductoModel',
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  motivo: {
    type: String,
    required: true
  },
  fechaDevolucion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DevolucionesModel', devolucionSchema);
