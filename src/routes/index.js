const express = require('express');
const User = require('../controllers/User')

const routes = express.Router();

routes.get('/user', User.index);
routes.post('/user', User.store);
routes.put('/user/:id', User.update);
routes.delete('/user/:id', User.delete);

module.exports = routes;