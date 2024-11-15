const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Orden = sequelize.define('Orden', {
  id_orden: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_orden: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  precio_orden: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  direccion_entrega: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado_orden: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'orden',
  timestamps: false
});

Orden.associate = (models) => {
  Orden.belongsTo(models.Carrito, {
    foreignKey: 'id_carrito',
    as: 'carrito'
  });
};

module.exports = Orden;