// models/DetalleCompra.js
const mongoose = require('mongoose');

const detalleCompraSchema = new mongoose.Schema({
  compra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompraModel',
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

module.exports = mongoose.model('DetalleCompraModel', detalleCompraSchema);
