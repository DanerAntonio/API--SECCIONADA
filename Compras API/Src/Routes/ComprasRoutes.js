// routes/compraRoutes.js
const express = require('express');
const router = express.Router();
const compraController = require('../Controllers/ComprasController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todas las compras
router.get('/', authMiddleware, compraController.obtenerCompras);

// Obtener una compra por ID
router.get('/:id', authMiddleware, compraController.obtenerCompraPorId);

// Crear nueva compra
router.post('/', authMiddleware, compraController.crearCompra);

// Actualizar compra (cambiar estado)
router.put('/:id', authMiddleware, compraController.actualizarCompra);

// Eliminar compra
router.delete('/:id', authMiddleware, compraController.eliminarCompra);

module.exports = router;
