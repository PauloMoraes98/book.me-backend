const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Test2 = require('../models/Test2');

const connection = new Sequelize(dbConfig);

Test2.init(connection);

module.exports = connection;