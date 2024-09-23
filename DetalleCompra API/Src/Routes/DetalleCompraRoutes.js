// routes/detalleCompraRoutes.js
const express = require('express');
const router = express.Router();
const detalleCompraController = require('../Controllers/DetalleCompraController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los detalles de compra
router.get('/', authMiddleware, detalleCompraController.obtenerDetallesCompra);

// Obtener detalles de compra por ID de compra
router.get('/compra/:compraId', authMiddleware, detalleCompraController.obtenerDetallesPorCompra);

// Crear nuevo detalle de compra
router.post('/', authMiddleware, detalleCompraController.crearDetalleCompra);

// Actualizar detalle de compra
router.put('/:id', authMiddleware, detalleCompraController.actualizarDetalleCompra);

// Eliminar detalle de compra
router.delete('/:id', authMiddleware, detalleCompraController.eliminarDetalleCompra);

module.exports = router;
