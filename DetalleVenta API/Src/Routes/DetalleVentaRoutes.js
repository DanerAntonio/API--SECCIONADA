// routes/detalleVentaRoutes.js
const express = require('express');
const router = express.Router();
const detalleVentaController = require('../Controllers/DetalleVentaController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los detalles de venta
router.get('/', authMiddleware, detalleVentaController.obtenerDetallesVenta);

// Obtener detalles de venta por ID de venta
router.get('/venta/:ventaId', authMiddleware, detalleVentaController.obtenerDetallesPorVenta);

// Crear nuevo detalle de venta
router.post('/', authMiddleware, detalleVentaController.crearDetalleVenta);

// Actualizar detalle de venta
router.put('/:id', authMiddleware, detalleVentaController.actualizarDetalleVenta);

// Eliminar detalle de venta
router.delete('/:id', authMiddleware, detalleVentaController.eliminarDetalleVenta);

module.exports = router;
