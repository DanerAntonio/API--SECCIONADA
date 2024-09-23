// routes/permisoRoutes.js
const express = require('express');
const router = express.Router();
const permisoController = require('../Controllers/PermisosController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los permisos
router.get('/', authMiddleware, permisoController.obtenerPermisos);

// Crear nuevo permiso
router.post('/', authMiddleware, permisoController.crearPermiso);

// Actualizar permiso
router.put('/:id', authMiddleware, permisoController.actualizarPermiso);

// Eliminar permiso
router.delete('/:id', authMiddleware, permisoController.eliminarPermiso);

module.exports = router;
