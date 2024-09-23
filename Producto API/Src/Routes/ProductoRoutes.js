// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../Controllers/ProductoController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los productos
router.get('/', authMiddleware, productoController.obtenerProductos);

// Crear nuevo producto
router.post('/', authMiddleware, productoController.crearProducto);

// Actualizar producto
router.put('/:id', authMiddleware, productoController.actualizarProducto);

// Eliminar producto
router.delete('/:id', authMiddleware, productoController.eliminarProducto);

module.exports = router;
