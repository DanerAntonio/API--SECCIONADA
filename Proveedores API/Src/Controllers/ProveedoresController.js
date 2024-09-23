// controllers/proveedorController.js
const Proveedor = require('../Models/ProveedoresModel');

// Obtener todos los proveedores
exports.obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

// Crear nuevo proveedor
exports.crearProveedor = async (req, res) => {
  const { nombre, contacto, direccion, telefono, email } = req.body;

  try {
    const nuevoProveedor = new Proveedor({
      nombre,
      contacto,
      direccion,
      telefono,
      email
    });

    await nuevoProveedor.save();
    res.json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
};

// Actualizar proveedor
exports.actualizarProveedor = async (req, res) => {
  const { nombre, contacto, direccion, telefono, email } = req.body;

  try {
    let proveedor = await Proveedor.findById(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    // Actualizar campos
    proveedor.nombre = nombre || proveedor.nombre;
    proveedor.contacto = contacto || proveedor.contacto;
    proveedor.direccion = direccion || proveedor.direccion;
    proveedor.telefono = telefono || proveedor.telefono;
    proveedor.email = email || proveedor.email;

    await proveedor.save();
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
};

// Eliminar proveedor
exports.eliminarProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    await proveedor.remove();
    res.json({ mensaje: 'Proveedor eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
};
