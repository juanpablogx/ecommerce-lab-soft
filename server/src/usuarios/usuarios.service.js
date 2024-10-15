const Usuario = require('./usuarios.model');

const create = async (usuario) => {
  return await Usuario.create(usuario);
};

const findAll = async () => {
  return await Usuario.findAll();
};

const findById = async (id) => {
  return await Usuario.findByPk(id);
};

const update = async (id, usuario) => {
  return await Usuario.update(usuario, {
    where: {
      id_usuario: id,
    },
    returning: true, // Para devolver el registro actualizado
  });
};

const remove = async (id) => {
  return await Usuario.destroy({
    where: {
      id_usuario: id,
    },
  });
};

const findByEmailPassword = async (email, password) => {
  return await Usuario.findOne({
    where: {
      correo_usuario: email,
      password_usuario: password,
    },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  findByEmailPassword,
};
