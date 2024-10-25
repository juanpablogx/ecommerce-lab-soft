const sequelize = require('../database/connection');

const Producto = require('../productos/productos.model');
const ProductoInventario = require('../productos-inventario/productos-inventario.model');

// Asegúrate de que las asociaciones se definan después de importar los modelos
Producto.associate({ ProductoInventario });
ProductoInventario.associate({ Producto });

// Sincronizar los modelos con la base de datos
const sync = sequelize.sync();

module.exports = sync;