const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../controllers/User')
const Book = require('../controllers/Book')

const routes = express.Router();

routes.post('/user', User.store);
routes.post('/login', User.login);

routes.use(authMiddleware);

routes.get('/user', User.index);
routes.put('/user', User.update);
routes.delete('/user', User.delete);

routes.post('/book', Book.store);
routes.get('/book', Book.index);
routes.put('/book/:id', Book.update);
routes.delete('/book/:id', Book.delete);

routes.get('/book/:id', Book.indexById);

module.exports = routes;
