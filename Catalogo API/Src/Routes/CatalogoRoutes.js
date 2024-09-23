// routes/catalogoRoutes.js
const express = require('express');
const router = express.Router();
const catalogoController = require('../Controllers/CatalogoController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los productos
router.get('/', catalogoController.obtenerProductos);

// Obtener un producto por ID
router.get('/:id', catalogoController.obtenerProductoPorId);

// Crear nuevo producto (necesita autenticación)
router.post('/', authMiddleware, catalogoController.crearProducto);

// Actualizar producto (necesita autenticación)
router.put('/:id', authMiddleware, catalogoController.actualizarProducto);

// Eliminar producto (necesita autenticación)
router.delete('/:id', authMiddleware, catalogoController.eliminarProducto);

module.exports = router;
