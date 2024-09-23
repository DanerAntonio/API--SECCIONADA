// routes/detallePedidoRoutes.js
const express = require('express');
const router = express.Router();
const detallePedidoController = require('../Controllers/DetallePedidoController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los detalles de pedido
router.get('/', authMiddleware, detallePedidoController.obtenerDetallesPedido);

// Obtener detalles de pedido por ID de pedido
router.get('/pedido/:pedidoId', authMiddleware, detallePedidoController.obtenerDetallesPorPedido);

// Crear nuevo detalle de pedido
router.post('/', authMiddleware, detallePedidoController.crearDetallePedido);

// Actualizar detalle de pedido
router.put('/:id', authMiddleware, detallePedidoController.actualizarDetallePedido);

// Eliminar detalle de pedido
router.delete('/:id', authMiddleware, detallePedidoController.eliminarDetallePedido);

module.exports = router;
