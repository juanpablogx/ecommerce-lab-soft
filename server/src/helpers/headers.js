const getAuthTokenFromHeader = (request) => {
  const authHeader = request.headers?.authorization;
  console.log('authHeader', authHeader);
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  return token;
};

module.exports = {
  getAuthTokenFromHeader
};