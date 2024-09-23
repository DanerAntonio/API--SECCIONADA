// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../Controllers/PedidoController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los pedidos
router.get('/', authMiddleware, pedidoController.obtenerPedidos);

// Crear nuevo pedido
router.post('/', authMiddleware, pedidoController.crearPedido);

// Actualizar pedido
router.put('/:id', authMiddleware, pedidoController.actualizarPedido);

// Eliminar pedido
router.delete('/:id', authMiddleware, pedidoController.eliminarPedido);

module.exports = router;
