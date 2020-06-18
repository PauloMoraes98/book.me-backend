const express = require('express');
const Test2Controller = require('../controllers/Test2Controller')

const routes = express.Router();

routes.get('/test2', Test2Controller.index);
routes.post('/test2', Test2Controller.store);

module.exports = routes;