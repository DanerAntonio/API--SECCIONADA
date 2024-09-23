// controllers/rolController.js
const Rol = require('../Models/RolesModel');

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.find().populate('permisos');
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// Crear nuevo rol
exports.crearRol = async (req, res) => {
  const { nombre, descripcion, permisos } = req.body;

  try {
    const nuevoRol = new Rol({
      nombre,
      descripcion,
      permisos
    });

    await nuevoRol.save();
    res.json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

// Actualizar rol
exports.actualizarRol = async (req, res) => {
  const { nombre, descripcion, permisos } = req.body;

  try {
    let rol = await Rol.findById(req.params.id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    // Actualizar campos
    rol.nombre = nombre || rol.nombre;
    rol.descripcion = descripcion || rol.descripcion;
    rol.permisos = permisos || rol.permisos;

    await rol.save();
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// Eliminar rol
exports.eliminarRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    await rol.remove();
    res.json({ mensaje: 'Rol eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};
