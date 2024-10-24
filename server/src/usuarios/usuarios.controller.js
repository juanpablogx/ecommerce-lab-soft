const services = require('./usuarios.service');
const jwt = require('../helpers/jwt');
const bcrypt = require('bcrypt');

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
    console.log(error);
    res.status(400).json(error);
  }
};

const registerController = async (req, res) => {
  try {
    const { nombre_usuario, apellido_usuario, correo_usuario, telefono_usuario, direccion_usuario, password_usuario, rol_usuario } = req.body;
    
    if (!nombre_usuario || !apellido_usuario || !correo_usuario || !password_usuario || !rol_usuario) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    const usuarioExistente = await services.findByEmail(correo_usuario);
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe con este correo' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password_usuario, salt);
    const nuevoUsuario = await services.create({
      nombre_usuario,
      apellido_usuario,
      correo_usuario,
      telefono_usuario,
      direccion_usuario,
      password_usuario,
      rol_usuario
    });
  
    const token = jwt.generateAccessToken(nuevoUsuario);
    res.status(201).json({ message: 'Usuario registrado con éxito', token, usuario: { ...nuevoUsuario.get(), password_usuario: undefined } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}

module.exports = {
  createController,
  findAllController,
  findByIdController,
  updateController,
  removeController,
  loginController,
  registerController
};
