const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Imagen_producto = sequelize.define('Imagen_Producto',
  {
    id_imagen_producto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'imagen_producto',
    timestamps: false,
  }
)

module.exports = Imagen_producto;