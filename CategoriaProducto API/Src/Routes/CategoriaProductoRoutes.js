// routes/categoriaProductoRoutes.js
const express = require('express');
const router = express.Router();
const categoriaProductoController = require('../Controllers/CategoriaProductoController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todas las categorías
router.get('/', categoriaProductoController.obtenerCategorias);

// Obtener una categoría por ID
router.get('/:id', categoriaProductoController.obtenerCategoriaPorId);

// Crear nueva categoría (necesita autenticación)
router.post('/', authMiddleware, categoriaProductoController.crearCategoria);

// Actualizar categoría (necesita autenticación)
router.put('/:id', authMiddleware, categoriaProductoController.actualizarCategoria);

// Eliminar categoría (necesita autenticación)
router.delete('/:id', authMiddleware, categoriaProductoController.eliminarCategoria);

module.exports = router;
