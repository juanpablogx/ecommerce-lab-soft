const services = require('./usuarios.service');
const jwt = require('../helpers/jwt');

const createController = async (req, res) => {
  try {
    const usuario = req.body;
    const newUsuario = await services.create(usuario);
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findAllController = async (req, res) => {
  try {
    const usuarios = await services.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await services.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.body;
    const updatedUsuario = await services.update(id, usuario);
    res.status(200).json(updatedUsuario);
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeController = async (req, res) => {
  try {
    const { id } = req.params;
    const row_affected = await services.remove(id);
    if (row_affected === 0) {
      return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }
    res.status(200).json({ message: `Usuario con id ${id} eliminado` });
  } catch (error) {
    res.status(400).json(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await services.findByEmailPassword(correo, password);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const token = jwt.generateAccessToken(usuario);
    res.status(200).json({ token, usuario: { ...usuario.get(), password_usuario: undefined } });
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
  loginController
};
