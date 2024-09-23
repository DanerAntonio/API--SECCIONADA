// models/DetallePedido.js
const mongoose = require('mongoose');

const detallePedidoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PedidoModel',
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

module.exports = mongoose.model('DetallePedidoModel', detallePedidoSchema);
