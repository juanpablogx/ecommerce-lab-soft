const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_producto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'producto',
  timestamps: false,
});

Producto.associate = (models) => {
  Producto.hasMany(models.ProductoInventario, {
    foreignKey: 'id_producto',
    as: 'productoInventario'
  });
};

module.exports = Producto;
