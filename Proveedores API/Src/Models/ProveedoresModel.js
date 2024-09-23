// models/Proveedor.js
const mongoose = require('mongoose');

const proveedoresSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  contacto: {
    type: String,
    required: true
  },
  direccion: {
    type: String
  },
  telefono: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProveedoresModel', proveedoresSchema);
