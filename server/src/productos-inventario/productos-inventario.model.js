const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Producto = require('../productos/productos.model');

const ProductoInventario = sequelize.define('ProductoInventario', {
  id_producto_inventario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto, // Nombre de la tabla referenciada
      key: 'id_producto'
    }
  },
  talla_inventario: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock_max: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stock_min: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'producto_inventario',
  timestamps: false
});

ProductoInventario.associate = (models) => {
  ProductoInventario.belongsTo(models.Producto, {
    foreignKey: 'id_producto',
    as: 'producto'
  });

  Producto.hasMany(models.ProductoCarrito, {
    foreignKey: 'id_producto_inventario',
    as: 'productosCarritos'
  });
};

module.exports = ProductoInventario;
