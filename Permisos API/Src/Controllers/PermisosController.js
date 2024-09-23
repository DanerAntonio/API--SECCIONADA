// controllers/permisoController.js
const Permiso = require('../Models/PermisosModel');

// Obtener todos los permisos
exports.obtenerPermisos = async (req, res) => {
  try {
    const permisos = await Permiso.find();
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los permisos' });
  }
};

// Crear nuevo permiso
exports.crearPermiso = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const nuevoPermiso = new Permiso({
      nombre,
      descripcion
    });

    await nuevoPermiso.save();
    res.json(nuevoPermiso);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el permiso' });
  }
};

// Actualizar permiso
exports.actualizarPermiso = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    let permiso = await Permiso.findById(req.params.id);

    if (!permiso) {
      return res.status(404).json({ mensaje: 'Permiso no encontrado' });
    }

    // Actualizar nombre y descripción
    permiso.nombre = nombre || permiso.nombre;
    permiso.descripcion = descripcion || permiso.descripcion;

    await permiso.save();
    res.json(permiso);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el permiso' });
  }
};

// Eliminar permiso
exports.eliminarPermiso = async (req, res) => {
  try {
    const permiso = await Permiso.findById(req.params.id);

    if (!permiso) {
      return res.status(404).json({ mensaje: 'Permiso no encontrado' });
    }

    await permiso.remove();
    res.json({ mensaje: 'Permiso eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el permiso' });
  }
};
