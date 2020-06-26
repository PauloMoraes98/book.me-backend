const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../controllers/User')

const routes = express.Router();

routes.post('/user', User.store);
routes.post('/singin', User.singin);

routes.use(authMiddleware);

routes.get('/user', User.index);
routes.put('/user/:id', User.update);
routes.delete('/user/:id', User.delete);

module.exports = routes;
