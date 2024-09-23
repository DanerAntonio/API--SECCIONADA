// models/Permiso.js
const mongoose = require('mongoose');

const permisosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  }
});

module.exports = mongoose.model('PermisosModel', permisosSchema);
