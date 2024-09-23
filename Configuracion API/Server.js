require('dotenv').config(); // Cargar variables de entorno desde un archivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Para permitir solicitudes CORS
const bodyParser = require('body-parser');

// Importar rutas
const usuarioRoutes = require('../teosof-api/Src/Routes/UsuarioRoutes');
const rolRoutes = require('../teosof-api/Src/Routes/RolesRoutes');
const productoRoutes = require('../teosof-api/Src/Routes/ProductoRoutes');
const proveedorRoutes = require('../teosof-api/Src/Routes/ProveedoresRoutes');
const ventaRoutes = require('../teosof-api/Src/Routes/VentasRoutes');
const clienteRoutes = require('../teosof-api/Src/Routes/ClienteRoutes');
const categoriaProductoRoutes = require('../teosof-api/Src/Routes/CategoriaProductoRoutes');
const carritoRoutes = require('../teosof-api/Src/Routes/CarritoRoutes');
const pedidoRoutes = require('../teosof-api/Src/Routes/PedidoRoutes');
const devolucionesRoutes = require('../teosof-api/Src/Routes/DevolucionesRoutes');
const detalleCompraRoutes = require('../teosof-api/Src/Routes/DetalleCompraRoutes');
const detallePedidoRoutes = require('../teosof-api/Src/Routes/DetallePedidoRoutes');
const detalleVentaRoutes = require('../teosof-api/Src/Routes/DetalleVentaRoutes');
const configuracionRoutes = require('../teosof-api/Src/Routes/ConfiguracionRoutes');

// Importar las rutas de Login y Registro
const loginRoutes = require('../teosof-api/Src/Routes/LoginRoutes'); 
const registerRoutes = require('../teosof-api/Src/Routes/RegisterRoutes');

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // Para parsear el cuerpo de las solicitudes en formato JSON

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/categorias', categoriaProductoRoutes);
app.use('/api/carritos', carritoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/devoluciones', devolucionesRoutes);
app.use('/api/detalles-compra', detalleCompraRoutes);
app.use('/api/detalles-pedido', detallePedidoRoutes);
app.use('/api/detalles-venta', detalleVentaRoutes);
app.use('/api/configuracion', configuracionRoutes);

// Rutas de autenticación (Login y Registro)
app.use('/api/auth/login', loginRoutes); // Ruta para el login
app.use('/api/auth/register', registerRoutes); // Ruta para el registro

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
