// models/DetalleVenta.js
const mongoose = require('mongoose');

const detalleVentaSchema = new mongoose.Schema({
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
  precioUnitario: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('DetalleVentaModel', detalleVentaSchema);
