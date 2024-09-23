// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../Controllers/ClienteController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener todos los clientes
router.get('/', authMiddleware, clienteController.obtenerClientes);

// Obtener un cliente por ID
router.get('/:id', authMiddleware, clienteController.obtenerClientePorId);

// Crear nuevo cliente (necesita autenticación)
router.post('/', authMiddleware, clienteController.crearCliente);

// Actualizar cliente (necesita autenticación)
router.put('/:id', authMiddleware, clienteController.actualizarCliente);

// Eliminar cliente (necesita autenticación)
router.delete('/:id', authMiddleware, clienteController.eliminarCliente);

module.exports = router;
