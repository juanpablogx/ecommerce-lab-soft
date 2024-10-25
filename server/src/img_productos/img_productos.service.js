const Imagen_Producto = require('./img_productos.model');

const create = async (imagen_producto) => {
  return await Imagen_Producto.create(imagen_producto);
}

module.exports = {
  create,
}


