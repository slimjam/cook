const config = require('../config');
const Sequelize = require('sequelize');
const db = new Sequelize(config.get('db_connect_str'));

module.exports = db;