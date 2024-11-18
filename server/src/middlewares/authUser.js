const jwt = require('../helpers/jwt');
const headers = require('../helpers/headers');
const serviceUsuarios = require('../usuarios/usuarios.service');

const authenticationUserMiddleware = (role = null) => (req, res, next) => {
  const token = headers.getAuthTokenFromHeader(req);
  console.log('token', token);
 

  if (!token) return res.status(401).json({error: 'No se recibio token'});

  jwt.verifyAccessToken(token, (err, user) => {
    if (err) return res.status(401).json({error: 'Token invalido'});

    serviceUsuarios.findById(user.id_usuario)
      .then((user) => {
        if (!user) return res.status(401).json({error: 'Token invalido'});

        if (role && user.rol_usuario !== role) return res.status(401).json({error: 'Token invalido'});

        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(500).json({error: 'Error al buscar el usuario'});
      });
  });
};

module.exports = {
  authenticationUserMiddleware
};