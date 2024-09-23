// controllers/productoController.js
const Producto = require('../Models/ProductoModel');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate('categoria');
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear nuevo producto
exports.crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoria, stock } = req.body;

  try {
    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      categoria,
      stock
    });

    await nuevoProducto.save();
    res.json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoria, stock } = req.body;

  try {
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Actualizar campos
    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.precio = precio || producto.precio;
    producto.categoria = categoria || producto.categoria;
    producto.stock = stock || producto.stock;

    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.remove();
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
