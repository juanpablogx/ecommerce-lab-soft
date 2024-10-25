const Imagen_Producto = require('./img_productos.model');

const create = async (imagen_producto) => {
  return await Imagen_Producto.create(imagen_producto);
}

const findByIdProducto = async (id) => {
  return await Imagen_Producto.findAll({
    where: {
      id_producto: id,
    }
  });
}

module.exports = {
  create,
}


