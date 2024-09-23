// models/Rol.js
const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  },
  permisos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permiso'
  }]
});

module.exports = mongoose.model('RolesModel', rolesSchema);
