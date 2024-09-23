// models/Compra.js
const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClienteModel',
    required: true
  },
  productos: [{
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
    precio: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  fechaCompra: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Completada', 'Cancelada'],
    default: 'Pendiente'
  }
});

module.exports = mongoose.model('ComprasModel', compraSchema);
