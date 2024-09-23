// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/UsuarioController'); // Asegúrate de que la ruta sea correcta
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Asegúrate de que la ruta sea correcta

// Obtener todos los usuarios
router.get('/', authMiddleware, usuarioController.obtenerUsuarios);

// Crear nuevo usuario
router.post('/', authMiddleware, usuarioController.crearUsuario);

// Actualizar usuario
router.put('/:id', authMiddleware, usuarioController.actualizarUsuario);

// Eliminar usuario
router.delete('/:id', authMiddleware, usuarioController.eliminarUsuario);

// Autenticación de usuario
router.post('/login', usuarioController.login);

module.exports = router;