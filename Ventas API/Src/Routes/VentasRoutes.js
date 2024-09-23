// routes/ventaRoutes.js
const express = require('express');
const router = express.Router();
const ventaController = require('../Controllers/VentasController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todas las ventas
router.get('/', authMiddleware, ventaController.obtenerVentas);

// Crear nueva venta
router.post('/', authMiddleware, ventaController.crearVenta);

// Actualizar venta
router.put('/:id', authMiddleware, ventaController.actualizarVenta);

// Eliminar venta
router.delete('/:id', authMiddleware, ventaController.eliminarVenta);

module.exports = router;
