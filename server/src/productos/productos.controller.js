const services = require('./productos.service');

const createController = async (req, res) => {
  try {
    const producto = req.body;
    const newProducto = await services.create(producto);
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findAllController = async (req, res) => {
  try {
    const productos = await services.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await services.findById(id);
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findByCategoryController = async (req, res) => {
  try {
    const { category } = req.params;
    const productos = await services.findByCategory(category);
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const producto = req.body;
    const updatedProducto = await services.update(id, producto);
    res.status(200).json(updatedProducto);
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeController = async (req, res) => {
  try {
    const { id } = req.params;
    const row_affected = await services.remove(id);
    if (row_affected === 0) {
      return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
    }
    res.status(200).json({ message: `Producto con id ${id} eliminado` });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createController,
  findAllController,
  findByIdController,
  findByCategoryController,
  updateController,
  removeController,
};