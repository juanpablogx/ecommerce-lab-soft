const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion_usuario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password_usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;