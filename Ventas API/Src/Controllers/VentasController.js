// controllers/ventaController.js
const Venta = require('../Models/VentasModel');

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('cliente productos.producto');
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

// Crear nueva venta
exports.crearVenta = async (req, res) => {
  const { cliente, productos } = req.body;

  try {
    const total = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const nuevaVenta = new Venta({
      cliente,
      productos,
      total
    });

    await nuevaVenta.save();
    res.json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

// Actualizar venta
exports.actualizarVenta = async (req, res) => {
  const { cliente, productos } = req.body;

  try {
    let venta = await Venta.findById(req.params.id);

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    const total = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Actualizar campos
    venta.cliente = cliente || venta.cliente;
    venta.productos = productos || venta.productos;
    venta.total = total;

    await venta.save();
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la venta' });
  }
};

// Eliminar venta
exports.eliminarVenta = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id);

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    await venta.remove();
    res.json({ mensaje: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la venta' });
  }
};
