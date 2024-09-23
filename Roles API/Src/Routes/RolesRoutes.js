// routes/rolRoutes.js
const express = require('express');
const router = express.Router();
const rolController = require('../Controllers/RolesController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los roles
router.get('/', authMiddleware, rolController.obtenerRoles);

// Crear nuevo rol
router.post('/', authMiddleware, rolController.crearRol);

// Actualizar rol
router.put('/:id', authMiddleware, rolController.actualizarRol);

// Eliminar rol
router.delete('/:id', authMiddleware, rolController.eliminarRol);

module.exports = router;
