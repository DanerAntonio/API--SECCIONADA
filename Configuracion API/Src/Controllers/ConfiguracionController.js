// controllers/configuracionController.js
const Configuracion = require('../Models/ConfiguracionModel');

// Obtener todas las configuraciones
exports.obtenerConfiguraciones = async (req, res) => {
  try {
    const configuraciones = await Configuracion.find();
    res.json(configuraciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las configuraciones' });
  }
};

// Obtener configuración por clave
exports.obtenerConfiguracionPorClave = async (req, res) => {
  try {
    const configuracion = await Configuracion.findOne({ clave: req.params.clave });
    if (!configuracion) {
      return res.status(404).json({ mensaje: 'Configuración no encontrada' });
    }
    res.json(configuracion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
};

// Crear nueva configuración
exports.crearConfiguracion = async (req, res) => {
  const { clave, valor, descripcion } = req.body;

  try {
    const nuevaConfiguracion = new Configuracion({ clave, valor, descripcion });
    await nuevaConfiguracion.save();
    res.json(nuevaConfiguracion);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'La clave de configuración ya existe' });
    }
    res.status(500).json({ error: 'Error al crear la configuración' });
  }
};

// Actualizar configuración
exports.actualizarConfiguracion = async (req, res) => {
  const { valor, descripcion } = req.body;

  try {
    let configuracion = await Configuracion.findOne({ clave: req.params.clave });

    if (!configuracion) {
      return res.status(404).json({ mensaje: 'Configuración no encontrada' });
    }

    configuracion.valor = valor || configuracion.valor;
    configuracion.descripcion = descripcion || configuracion.descripcion;
    configuracion.fechaModificacion = Date.now();

    await configuracion.save();
    res.json(configuracion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la configuración' });
  }
};

// Eliminar configuración
exports.eliminarConfiguracion = async (req, res) => {
  try {
    const configuracion = await Configuracion.findOne({ clave: req.params.clave });

    if (!configuracion) {
      return res.status(404).json({ mensaje: 'Configuración no encontrada' });
    }

    await configuracion.remove();
    res.json({ mensaje: 'Configuración eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la configuración' });
  }
};
