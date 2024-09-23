// controllers/detalleVentaController.js
const DetalleVenta = require('../Models/DetalleVentaModel');
const Producto = require('../Models/ProductoModel');

// Obtener todos los detalles de venta
exports.obtenerDetallesVenta = async (req, res) => {
  try {
    const detallesVenta = await DetalleVenta.find().populate('producto').populate('venta');
    res.json(detallesVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de venta' });
  }
};

// Obtener detalles de venta por ID de venta
exports.obtenerDetallesPorVenta = async (req, res) => {
  try {
    const detallesVenta = await DetalleVenta.find({ venta: req.params.ventaId }).populate('producto');
    if (!detallesVenta.length) {
      return res.status(404).json({ mensaje: 'Detalles de venta no encontrados para la venta especificada' });
    }
    res.json(detallesVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de la venta' });
  }
};

// Crear nuevo detalle de venta
exports.crearDetalleVenta = async (req, res) => {
  const { venta, producto, cantidad, precioUnitario } = req.body;

  try {
    // Verificar que el producto exista
    const productoExiste = await Producto.findById(producto);
    if (!productoExiste) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Calcular subtotal
    const subtotal = cantidad * precioUnitario;

    // Crear el detalle de la venta
    const nuevoDetalleVenta = new DetalleVenta({
      venta,
      producto,
      cantidad,
      precioUnitario,
      subtotal
    });

    await nuevoDetalleVenta.save();
    res.json(nuevoDetalleVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el detalle de venta' });
  }
};

// Actualizar detalle de venta
exports.actualizarDetalleVenta = async (req, res) => {
  const { cantidad, precioUnitario } = req.body;

  try {
    let detalleVenta = await DetalleVenta.findById(req.params.id);

    if (!detalleVenta) {
      return res.status(404).json({ mensaje: 'Detalle de venta no encontrado' });
    }

    // Actualizar cantidad, precio unitario y subtotal
    detalleVenta.cantidad = cantidad || detalleVenta.cantidad;
    detalleVenta.precioUnitario = precioUnitario || detalleVenta.precioUnitario;
    detalleVenta.subtotal = detalleVenta.cantidad * detalleVenta.precioUnitario;

    await detalleVenta.save();
    res.json(detalleVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el detalle de venta' });
  }
};

// Eliminar detalle de venta
exports.eliminarDetalleVenta = async (req, res) => {
  try {
    const detalleVenta = await DetalleVenta.findById(req.params.id);

    if (!detalleVenta) {
      return res.status(404).json({ mensaje: 'Detalle de venta no encontrado' });
    }

    await detalleVenta.remove();
    res.json({ mensaje: 'Detalle de venta eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el detalle de venta' });
  }
};
