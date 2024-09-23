// controllers/detallePedidoController.js
const DetallePedido = require('../Models/DetallePedidoModel');
const Producto = require('../Models/ProductoModel');

// Obtener todos los detalles de pedido
exports.obtenerDetallesPedido = async (req, res) => {
  try {
    const detallesPedido = await DetallePedido.find().populate('producto').populate('pedido');
    res.json(detallesPedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de pedido' });
  }
};

// Obtener detalles de pedido por ID de pedido
exports.obtenerDetallesPorPedido = async (req, res) => {
  try {
    const detallesPedido = await DetallePedido.find({ pedido: req.params.pedidoId }).populate('producto');
    if (!detallesPedido.length) {
      return res.status(404).json({ mensaje: 'Detalles de pedido no encontrados para el pedido especificado' });
    }
    res.json(detallesPedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles del pedido' });
  }
};

// Crear nuevo detalle de pedido
exports.crearDetallePedido = async (req, res) => {
  const { pedido, producto, cantidad, precioUnitario } = req.body;

  try {
    // Verificar que el producto exista
    const productoExiste = await Producto.findById(producto);
    if (!productoExiste) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Calcular subtotal
    const subtotal = cantidad * precioUnitario;

    // Crear el detalle del pedido
    const nuevoDetallePedido = new DetallePedido({
      pedido,
      producto,
      cantidad,
      precioUnitario,
      subtotal
    });

    await nuevoDetallePedido.save();
    res.json(nuevoDetallePedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el detalle de pedido' });
  }
};

// Actualizar detalle de pedido
exports.actualizarDetallePedido = async (req, res) => {
  const { cantidad, precioUnitario } = req.body;

  try {
    let detallePedido = await DetallePedido.findById(req.params.id);

    if (!detallePedido) {
      return res.status(404).json({ mensaje: 'Detalle de pedido no encontrado' });
    }

    // Actualizar cantidad, precio unitario y subtotal
    detallePedido.cantidad = cantidad || detallePedido.cantidad;
    detallePedido.precioUnitario = precioUnitario || detallePedido.precioUnitario;
    detallePedido.subtotal = detallePedido.cantidad * detallePedido.precioUnitario;

    await detallePedido.save();
    res.json(detallePedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el detalle de pedido' });
  }
};

// Eliminar detalle de pedido
exports.eliminarDetallePedido = async (req, res) => {
  try {
    const detallePedido = await DetallePedido.findById(req.params.id);

    if (!detallePedido) {
      return res.status(404).json({ mensaje: 'Detalle de pedido no encontrado' });
    }

    await detallePedido.remove();
    res.json({ mensaje: 'Detalle de pedido eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el detalle de pedido' });
  }
};
