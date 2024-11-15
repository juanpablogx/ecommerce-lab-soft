const services = require('./ordenes.service');

const createOrdenController = async (req, res) => {
  try {
    const { id_carrito, direccion_entrega } = req.body;
    const orden = await services.createOrden({ id_carrito, direccion_entrega });
    res.status(201).json(orden);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const findOrdenController = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await services.findOrden(id);
    res.status(200).json(orden);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const payOrdenController = async (req, res) => {
  try {
    const { id } = req.params;
    const payedOrden = await services.payOrden(id);
    res.status(200).json(payedOrden);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const cancelOrdenController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await services.cancelOrden(id);
    if (result === 0) {
      return res.status(404).json({ message: `Orden con id ${id} no encontrada` });
    }
    res.status(200).json({ message: `Orden con id ${id} cancelada` });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const findOrdenByIdCarritoController = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await services.findOrdenByIdCarrito(id);
    res.status(200).json(orden);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  createOrdenController,
  findOrdenController,
  payOrdenController,
  cancelOrdenController,
  findOrdenByIdCarritoController
};