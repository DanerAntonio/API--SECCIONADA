// controllers/devolucionController.js
const Devolucion = require('../Models/DevolucionesModel');
const Producto = require('../Models/ProductoModel');

// Obtener todas las devoluciones
exports.obtenerDevoluciones = async (req, res) => {
  try {
    const devoluciones = await Devolucion.find().populate('producto').populate('venta');
    res.json(devoluciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las devoluciones' });
  }
};

// Crear nueva devolución
exports.crearDevolucion = async (req, res) => {
  const { venta, producto, cantidad, motivo } = req.body;

  try {
    // Verificar que el producto exista
    const productoExiste = await Producto.findById(producto);
    if (!productoExiste) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Crear la devolución
    const nuevaDevolucion = new Devolucion({
      venta,
      producto,
      cantidad,
      motivo
    });

    await nuevaDevolucion.save();
    res.json(nuevaDevolucion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la devolución' });
  }
};

// Actualizar devolución
exports.actualizarDevolucion = async (req, res) => {
  const { cantidad, motivo } = req.body;

  try {
    let devolucion = await Devolucion.findById(req.params.id);

    if (!devolucion) {
      return res.status(404).json({ mensaje: 'Devolución no encontrada' });
    }

    // Actualizar cantidad y motivo
    devolucion.cantidad = cantidad || devolucion.cantidad;
    devolucion.motivo = motivo || devolucion.motivo;

    await devolucion.save();
    res.json(devolucion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la devolución' });
  }
};

// Eliminar devolución
exports.eliminarDevolucion = async (req, res) => {
  try {
    const devolucion = await Devolucion.findById(req.params.id);

    if (!devolucion) {
      return res.status(404).json({ mensaje: 'Devolución no encontrada' });
    }

    await devolucion.remove();
    res.json({ mensaje: 'Devolución eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la devolución' });
  }
};
