// models/CategoriaProducto.js
const mongoose = require('mongoose');

const categoriaProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CategoriaProductoModel', categoriaProductoSchema);
