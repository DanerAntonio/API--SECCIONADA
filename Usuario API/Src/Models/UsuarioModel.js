// models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rol',
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// Middleware para hashear la contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('contraseña')) {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
  next();
});

// Método para verificar la contraseña
usuarioSchema.methods.verificarContraseña = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
