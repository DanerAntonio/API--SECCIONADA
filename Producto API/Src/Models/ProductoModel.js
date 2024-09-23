// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoriaProductoModel',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProductoModel', productoSchema);
