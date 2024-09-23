// controllers/usuarioController.js
const Usuario = require('../Models/UsuarioModel'); // Asegúrate de que la ruta sea correcta
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('rol');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Crear nuevo usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body;

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: hashedPassword, // Guardar la contraseña hasheada
      rol
    });

    await nuevoUsuario.save();
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body;

  try {
    let usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar campos
    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.rol = rol || usuario.rol;

    if (contraseña) {
      // Hash de la nueva contraseña si se proporciona
      usuario.contraseña = await bcrypt.hash(contraseña, 10);
    }

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.remove();
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

// Autenticación de usuario
exports.login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email }).populate('rol');
    if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};
