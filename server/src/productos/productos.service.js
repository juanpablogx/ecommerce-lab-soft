const Producto = require('./productos.model');
const ProductoInventario = require('../productos-inventario/productos-inventario.model');
const ImagenProducto = require('./imagen_producto.model');

const create = async (producto) => {
  return await Producto.create(producto);
};

const findAll = async () => {
  return await Producto.findAll();
};

const findById = async (id) => {
  return await Producto.findByPk(id);
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
const getAllProducts = async () => {
  const productos = await Producto.findAll();
  
  return await Promise.all(
    productos.map(async (producto) => {
      const inventario = await ProductoInventario.findAll({
        where: { id_producto: producto.id_producto },
      });
      
      const imagenes = await ImagenProducto.findAll({
        where: { id_producto: producto.id_producto },
        attributes: ['url'],
      });

      return { 
        ...producto.dataValues, 
        inventario, 
        imagenes: imagenes.map(imagen => imagen.url)
      };
    })
  );
};


const getProductById = async (id_producto) => {
  const producto = await Producto.findByPk(id_producto);
  if (!producto) return null;

  const inventario = await ProductoInventario.findAll({
    where: { id_producto },
  });

  const imagenes = await ImagenProducto.findAll({
    where: { id_producto },
    attributes: ['url'],
  });

  return {
    ...producto.dataValues,
    inventario,
    imagenes: imagenes.map(imagen => imagen.url),
  };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  getAllProducts,
  getProductById
};
