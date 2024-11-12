const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Usuario = require('../usuarios/usuarios.model');

const Carrito = sequelize.define('Carrito', {
  id_carrito: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado_carrito: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_creacion_carrito: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'carrito',
  timestamps: false
});

const ProductoCarrito = sequelize.define('ProductoCarrito', {
  id_producto_carrito: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto_inventario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'producto_carrito',
  timestamps: false
});

Carrito.associate = (models) => {
  Carrito.belongsTo(models.Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  Carrito.hasMany(models.ProductoCarrito, {
    foreignKey: 'id_carrito',
    as: 'productosCarrito'
  });
};

ProductoCarrito.associate = (models) => {
  ProductoCarrito.belongsTo(models.Carrito, {
    foreignKey: 'id_carrito',
    as: 'carrito'
  });

  ProductoCarrito.belongsTo(models.ProductoInventario, {
    foreignKey: 'id_producto_inventario',
    as: 'productoInventario'
  });
};

module.exports = {
  Carrito,
  ProductoCarrito
};