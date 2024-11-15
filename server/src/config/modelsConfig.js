const sequelize = require('../database/connection');

const Producto = require('../productos/productos.model');
const ProductoInventario = require('../productos-inventario/productos-inventario.model');
const Imagen_producto = require('../img_productos/img_productos.model');
const Usuario = require('../usuarios/usuarios.model');
const { Carrito, ProductoCarrito } = require('../carrito/carrito.model');
const Orden = require('../ordenes/ordenes.model');

// Asegúrate de que las asociaciones se definan después de importar los modelos
Producto.associate({ ProductoInventario, Imagen_producto });
ProductoInventario.associate({ Producto, ProductoCarrito });
Imagen_producto.associate({ Producto });
Usuario.associate({ Carrito });
Carrito.associate({ Usuario, ProductoCarrito, Orden });
ProductoCarrito.associate({ Carrito, ProductoInventario });
Orden.associate({ Carrito });

// Sincronizar los modelos con la base de datos
const sync = sequelize.sync();

module.exports = sync;