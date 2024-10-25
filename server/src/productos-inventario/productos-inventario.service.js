const { Op } = require('sequelize');
const Producto = require('../productos/productos.model');
const ProductoInventario = require('./productos-inventario.model');
const Imagen_producto = require('../img_productos/img_productos.model');

const create = async (productoInventario) => {
  return await ProductoInventario.create(productoInventario);
};

const findAll = async () => {
  let productosInventario = await ProductoInventario.findAll({
    include: [
      {
        model: Producto,
        as: 'producto'
      },
    ],
  });

  for (let i = 0; i < productosInventario.length; i++) {
    let imagenes = await Imagen_producto.findAll({
      where: {
        id_producto: productosInventario[i].id_producto,
      },
    });

    productosInventario[i].dataValues.imagenes = imagenes;
  }

  return productosInventario;
};

const findById = async (id) => {
  let productosInventario = await ProductoInventario.findByPk(id, {
    include: [
      {
        model: Producto,
        as: 'producto'
      },
    ],
  });

  if (productosInventario?.id_producto_inventario) {
    let imagenes = await Imagen_producto.findAll({
      where: {
        id_producto: productosInventario.id_producto,
      },
    });

    productosInventario.dataValues.imagenes = imagenes;
  }

  return productosInventario;
};

const findByCategory = async (category) => {
  return await ProductoInventario.findAll({
    include: [
      {
        model: Producto,
        as: 'producto',
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