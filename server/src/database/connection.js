const { Sequelize } = require('sequelize');

const { db } = require('../config/config');

const connection = new Sequelize(db.uri, {
  logging: console.log,
});

module.exports = connection;