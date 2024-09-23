// controllers/clienteController.js
const Cliente = require('../Models/ClienteModel');

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

// Obtener cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

// Crear nuevo cliente
exports.crearCliente = async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;

  try {
    const nuevoCliente = new Cliente({
      nombre,
      email,
      telefono,
      direccion
    });

    await nuevoCliente.save();
    res.json(nuevoCliente);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

// Actualizar cliente
exports.actualizarCliente = async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;

  try {
    let cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    cliente.nombre = nombre || cliente.nombre;
    cliente.email = email || cliente.email;
    cliente.telefono = telefono || cliente.telefono;
    cliente.direccion = direccion || cliente.direccion;

    await cliente.save();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    await cliente.remove();
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};
