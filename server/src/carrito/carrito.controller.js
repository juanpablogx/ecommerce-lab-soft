const services = require('./carrito.service');

const createProductoCarritoController = async (req, res) => {
  try {
    console.log(req.body);
    const { id_producto_inventario, cantidad } = req.body;

    const id_usuario = req.user.id_usuario;
    const result = await services.addproductoCarrito(id_usuario, id_producto_inventario, cantidad);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const findCarritoController = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const carrito = await services.findActiveCarrito(id_usuario);
    res.status(200).json(carrito);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updateQuantityController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { cantidad } = req.body;
    if (cantidad < 1) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
    }

    let result = await services.updateQuantityProductoCarrito(id, cantidad);
    if (result[0] === 0) {
      return res.status(404).json({ message: `Producto del carrito con id ${id} no encontrado` });
    } else {
      result = result[1][0];
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const cancelCarritoController = async (req, res) => {
  try {
    const { id } = req.params;
    const row_affected = await services.cancelCarrito(id);
    if (row_affected === 0) {
      return res.status(404).json({ message: `Carrito con id ${id} no encontrado` });
    }
    res.status(200).json({ message: `Carrito con id ${id} cancelado` });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const removeProductoCarritoController = async (req, res) => {
  try {
    const { id } = req.params;
    const row_affected = await services.removeProductoCarrito(id);
    if (row_affected === 0) {
      return res.status(404).json({ message: `Producto con id ${id} no encontrado en el carrito` });
    }
    res.status(200).json({ message: `Producto con id ${id} eliminado exitosamente del carrito` });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = {
  createProductoCarritoController,
  findCarritoController,
  updateQuantityController,
  cancelCarritoController,
  removeProductoCarritoController
};