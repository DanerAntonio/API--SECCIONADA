// models/Configuracion.js
const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  clave: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  valor: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  fechaModificacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ConfiguracionModel', configuracionSchema);
