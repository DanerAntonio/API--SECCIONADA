// routes/proveedorRoutes.js
const express = require('express');
const router = express.Router();
const proveedorController = require('../Controllers/ProveedoresController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los proveedores
router.get('/', authMiddleware, proveedorController.obtenerProveedores);

// Crear nuevo proveedor
router.post('/', authMiddleware, proveedorController.crearProveedor);

// Actualizar proveedor
router.put('/:id', authMiddleware, proveedorController.actualizarProveedor);

// Eliminar proveedor
router.delete('/:id', authMiddleware, proveedorController.eliminarProveedor);

module.exports = router;
