const getAuthTokenFromHeader = (request) => {
  const authHeader = request.headers?.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  return token;
};

module.exports = {
  getAuthTokenFromHeader
};