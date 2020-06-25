const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Test2 = require('../models/Test2');
const User = require('../models/User');
const Book = require('../models/Book');

const connection = new Sequelize(dbConfig);

Test2.init(connection);
User.init(connection);
Book.init(connection);

User.associate(connection.models);
Book.associate(connection.models);

module.exports = connection;
