const { Op } = require('sequelize');
const Producto = require('../productos/productos.model');
const ProductoInventario = require('./productos-inventario.model');

const create = async (productoInventario) => {
  return await ProductoInventario.create(productoInventario);
};

const findAll = async () => {
  return await ProductoInventario.findAll({
    include: [
      {
        model: Producto,
        as: 'producto',
        attributes: ['id_producto', 'nombre_producto', 'descripcion_producto', 'categoria'],
      },
    ],
  });
};

const findById = async (id) => {
  return await ProductoInventario.findByPk(id, {
    include: [
      {
        model: Producto,
        as: 'producto',
        attributes: ['id_producto', 'nombre_producto', 'descripcion_producto', 'categoria'],
      },
    ],
  });
};

const findByCategory = async (category) => {
  return await ProductoInventario.findAll({
    include: [
      {
        model: Producto,
        as: 'producto',
        attributes: ['id_producto', 'nombre_producto', 'descripcion_producto', 'categoria'],
        where: {
          categoria: {
            [Op.like]: `%${category}%`,
          },
        },
      },
    ],
  });
};

const findByNameProduct = async (nameProduct) => {
  return await ProductoInventario.findAll({
    include: [
      {
        model: Producto,
        as: 'producto',
        attributes: ['id_producto', 'nombre_producto', 'descripcion_producto', 'categoria'],
        where: {
          nombre_producto: {
            [Op.like]: `%${nameProduct}%`,
          },
        },
      },
    ],
  });
};

const update = async (id, productoInventario) => {
  return await ProductoInventario.update(productoInventario, {
    where: {
      id_producto_inventario: id,
    },
    returning: true,
  });
};

const remove = async (id) => {
  return await ProductoInventario.destroy({
    where: {
      id_producto_inventario: id,
    },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findByNameProduct,
  findByCategory,
  update,
  remove
};