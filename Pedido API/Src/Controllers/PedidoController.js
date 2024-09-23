// controllers/pedidoController.js
const Pedido = require('../Models/PedidoModel');

// Obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente');
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

// Crear nuevo pedido
exports.crearPedido = async (req, res) => {
  const { cliente, estado, total } = req.body;

  try {
    const nuevoPedido = new Pedido({
      cliente,
      estado,
      total
    });

    await nuevoPedido.save();
    res.json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

// Actualizar pedido
exports.actualizarPedido = async (req, res) => {
  const { estado, total } = req.body;

  try {
    let pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    // Actualizar estado y total
    pedido.estado = estado || pedido.estado;
    pedido.total = total || pedido.total;

    await pedido.save();
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

// Eliminar pedido
exports.eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    await pedido.remove();
    res.json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};
