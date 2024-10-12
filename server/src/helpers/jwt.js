const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  let token = jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '1800s'});
  console.log(token);
  return token;
}

const verifyAccessToken = (token, callback) => {
  return jwt.verify(token, process.env.SECRET_TOKEN, callback);
}

module.exports = {
  generateAccessToken,
  verifyAccessToken
}