const sequelize = require('../database/connection');

const Producto = require('../productos/productos.model');
const ProductoInventario = require('../productos-inventario/productos-inventario.model');
const Imagen_producto = require('../img_productos/img_productos.model');

// Asegúrate de que las asociaciones se definan después de importar los modelos
Producto.associate({ ProductoInventario, Imagen_producto });
ProductoInventario.associate({ Producto });
Imagen_producto.associate({ Producto });

// Sincronizar los modelos con la base de datos
const sync = sequelize.sync();

module.exports = sync;