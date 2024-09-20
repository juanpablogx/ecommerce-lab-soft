const Producto = require('./productos.model');

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

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};