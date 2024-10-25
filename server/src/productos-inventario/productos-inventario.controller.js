const services = require('./productos-inventario.service');

const createController = async (req, res) => {
  try {
    const productoInventario = req.body;
    const newProductoInventario = await services.create(productoInventario);
    res.status(201).json(newProductoInventario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findAllController = async (req, res, next) => {
  try {
    const productosInventario = await services.findAll();
    res.status(200).json(productosInventario);
  } catch (error) {
    next(error);
  }
};

const findByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const productoInventario = await services.findById(id);
    res.status(200).json(productoInventario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findByCategoryController = async (req, res) => {
  try {
    const { categoria } = req.params;
    const productosInventario = await services.findByCategory(categoria);
    res.status(200).json(productosInventario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findByNameProductController = async (req, res) => {
  try {
    const { nombre_producto } = req.params;
    const productosInventario = await services.findByNameProduct(nombre_producto);
    res.status(200).json(productosInventario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const productoInventario = req.body;
    const updatedProductoInventario = await services.update(id, productoInventario);
    res.status(200).json(updatedProductoInventario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeController = async (req, res) => {
  try {
    const { id } = req.params;
    const row_affected = await services.remove(id);
    if (row_affected === 0) {
      return res.status(404).json({ message: `Producto con id ${id} no encontrado en el inventario` });
    }
    res.status(200).json({ message: `Producto con id ${id} eliminado del inventario` });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createController,
  findAllController,
  findByIdController,
  updateController,
  removeController,
  findByCategoryController,
  findByNameProductController
};