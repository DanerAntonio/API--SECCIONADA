// routes/devolucionRoutes.js
const express = require('express');
const router = express.Router();
const devolucionController = require('../Controllers/DevolucionesController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todas las devoluciones
router.get('/', authMiddleware, devolucionController.obtenerDevoluciones);

// Crear nueva devolución
router.post('/', authMiddleware, devolucionController.crearDevolucion);

// Actualizar devolución
router.put('/:id', authMiddleware, devolucionController.actualizarDevolucion);

// Eliminar devolución
router.delete('/:id', authMiddleware, devolucionController.eliminarDevolucion);

module.exports = router;
