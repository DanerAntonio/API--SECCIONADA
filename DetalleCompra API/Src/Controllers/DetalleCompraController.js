// controllers/detalleCompraController.js
const DetalleCompra = require('../Models/DetalleCompraModel');
const Producto = require('../Models/ProductoModel');

// Obtener todos los detalles de compra
exports.obtenerDetallesCompra = async (req, res) => {
  try {
    const detallesCompra = await DetalleCompra.find().populate('producto').populate('compra');
    res.json(detallesCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de compra' });
  }
};

// Obtener detalles de compra por ID de compra
exports.obtenerDetallesPorCompra = async (req, res) => {
  try {
    const detallesCompra = await DetalleCompra.find({ compra: req.params.compraId }).populate('producto');
    if (!detallesCompra.length) {
      return res.status(404).json({ mensaje: 'Detalles de compra no encontrados para la compra especificada' });
    }
    res.json(detallesCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de la compra' });
  }
};

// Crear nuevo detalle de compra
exports.crearDetalleCompra = async (req, res) => {
  const { compra, producto, cantidad, precioUnitario } = req.body;

  try {
    // Verificar que el producto exista
    const productoExiste = await Producto.findById(producto);
    if (!productoExiste) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Calcular subtotal
    const subtotal = cantidad * precioUnitario;

    // Crear el detalle de la compra
    const nuevoDetalleCompra = new DetalleCompra({
      compra,
      producto,
      cantidad,
      precioUnitario,
      subtotal
    });

    await nuevoDetalleCompra.save();
    res.json(nuevoDetalleCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el detalle de compra' });
  }
};

// Actualizar detalle de compra
exports.actualizarDetalleCompra = async (req, res) => {
  const { cantidad, precioUnitario } = req.body;

  try {
    let detalleCompra = await DetalleCompra.findById(req.params.id);

    if (!detalleCompra) {
      return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
    }

    // Actualizar cantidad, precio unitario y subtotal
    detalleCompra.cantidad = cantidad || detalleCompra.cantidad;
    detalleCompra.precioUnitario = precioUnitario || detalleCompra.precioUnitario;
    detalleCompra.subtotal = detalleCompra.cantidad * detalleCompra.precioUnitario;

    await detalleCompra.save();
    res.json(detalleCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el detalle de compra' });
  }
};

// Eliminar detalle de compra
exports.eliminarDetalleCompra = async (req, res) => {
  try {
    const detalleCompra = await DetalleCompra.findById(req.params.id);

    if (!detalleCompra) {
      return res.status(404).json({ mensaje: 'Detalle de compra no encontrado' });
    }

    await detalleCompra.remove();
    res.json({ mensaje: 'Detalle de compra eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el detalle de compra' });
  }
};
