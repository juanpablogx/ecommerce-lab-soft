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

const getAllProductsController = async (req, res) => {
  try {
    const productosConDetalles = await services.getAllProducts();
    if (productosConDetalles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' });
    }
    res.status(200).json(productosConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};


const getProductByIdController = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const productoConDetalles = await services.getProductById(id_producto);
    if (!productoConDetalles) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(productoConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

module.exports = {
  createController,
  findAllController,
  findByIdController,
  updateController,
  removeController,
  getAllProductsController,
  getProductByIdController
};
