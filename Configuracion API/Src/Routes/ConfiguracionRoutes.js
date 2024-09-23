// routes/configuracionRoutes.js
const express = require('express');
const router = express.Router();
const configuracionController = require('../Controllers/ConfiguracionController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todas las configuraciones
router.get('/', authMiddleware, configuracionController.obtenerConfiguraciones);

// Obtener una configuración por clave
router.get('/:clave', authMiddleware, configuracionController.obtenerConfiguracionPorClave);

// Crear nueva configuración
router.post('/', authMiddleware, configuracionController.crearConfiguracion);

// Actualizar configuración
router.put('/:clave', authMiddleware, configuracionController.actualizarConfiguracion);

// Eliminar configuración
router.delete('/:clave', authMiddleware, configuracionController.eliminarConfiguracion);

module.exports = router;
