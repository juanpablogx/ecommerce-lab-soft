const { config } = require('dotenv');
config();

module.exports = {
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI,
  },
};