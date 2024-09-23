// controllers/categoriaProductoController.js
const CategoriaProducto = require('../Models/CategoriaProductoModel');

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaProducto.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// Obtener categoría por ID
exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await CategoriaProducto.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

// Crear nueva categoría
exports.crearCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const nuevaCategoria = new CategoriaProducto({ nombre, descripcion });
    await nuevaCategoria.save();
    res.json(nuevaCategoria);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'La categoría ya existe' });
    }
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// Actualizar categoría
exports.actualizarCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    let categoria = await CategoriaProducto.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    categoria.nombre = nombre || categoria.nombre;
    categoria.descripcion = descripcion || categoria.descripcion;

    await categoria.save();
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// Eliminar categoría
exports.eliminarCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaProducto.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await categoria.remove();
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
