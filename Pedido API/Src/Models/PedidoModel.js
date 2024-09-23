// models/Pedido.js
const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClienteModel',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  fechaPedido: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('PedidoModel', pedidoSchema);
