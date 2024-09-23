// controllers/compraController.js
const Compra = require('../Models/ComprasModel');
const Cliente = require('../Models/ClienteModel');
const Producto = require('../Models/ProductoModel');

// Obtener todas las compras
exports.obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.find().populate('cliente').populate('productos.producto');
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
};

// Obtener compra por ID
exports.obtenerCompraPorId = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id).populate('cliente').populate('productos.producto');
    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la compra' });
  }
};

// Crear nueva compra
exports.crearCompra = async (req, res) => {
  const { cliente, productos } = req.body;

  try {
    // Verificar que el cliente exista
    const clienteExiste = await Cliente.findById(cliente);
    if (!clienteExiste) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // Calcular el total de la compra
    let totalCompra = 0;
    for (let item of productos) {
      const producto = await Producto.findById(item.producto);
      if (!producto) {
        return res.status(404).json({ mensaje: `Producto con ID ${item.producto} no encontrado` });
      }
      totalCompra += producto.precio * item.cantidad;
    }

    // Crear la compra
    const nuevaCompra = new Compra({
      cliente,
      productos,
      total: totalCompra
    });

    await nuevaCompra.save();
    res.json(nuevaCompra);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la compra' });
  }
};

// Actualizar compra (cambiar estado)
exports.actualizarCompra = async (req, res) => {
  const { estado } = req.body;

  try {
    let compra = await Compra.findById(req.params.id);

    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    compra.estado = estado || compra.estado;

    await compra.save();
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la compra' });
  }
};

// Eliminar compra
exports.eliminarCompra = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id);

    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    await compra.remove();
    res.json({ mensaje: 'Compra eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la compra' });
  }
};
