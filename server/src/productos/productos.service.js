const Producto = require('./productos.model');
const Imagen_producto = require('../img_productos/img_productos.model');
const ProductoInventario = require('../productos-inventario/productos-inventario.model');

const create = async (producto) => {
  return await Producto.create(producto);
};

const findAll = async () => {
  let productos = await Producto.findAll();

  for (let i = 0; i < productos.length; i++) {
    let imagenes = await Imagen_producto.findAll({
      where: {
        id_producto: productos[i].id_producto,
      },
    });

    productos[i].dataValues.imagenes = imagenes;
  }

  return productos;
};

const findById = async (id) => {
  let productos = await Producto.findByPk(
    id,
    {
      include: [
        {
          model: ProductoInventario,
          as: 'productoInventario',
        },
      ],
    }
  );

  if (productos?.id_producto) {
    let imagenes = await Imagen_producto.findAll({
      where: {
        id_producto: productos.id_producto,
      }
    });

    productos.dataValues.imagenes = imagenes;
  }

  return productos;
};

const findByCategory = async (category) => {
  let productos = await Producto.findAll({
    where: {
      categoria: category
    }
  });

  for (let i = 0; i < productos.length; i++) {
    let imagenes = await Imagen_producto.findAll({
      where: {
        id_producto: productos[i].id_producto,
      },
    });

    productos[i].dataValues.imagenes = imagenes;
  }

  return productos;
};

const update = async (id, producto) => {
  return await Producto.update(producto, {
    where: {
      id_producto: id,
    },
    returning: true,
  });
};

const remove = async (id) => {
  return await Producto.destroy({
    where: {
      id_producto: id,
    },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findByCategory,
  update,
  remove
};