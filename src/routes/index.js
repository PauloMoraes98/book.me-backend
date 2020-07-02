const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../controllers/User')
const Book = require('../controllers/Book')

const routes = express.Router();

routes.post('/user', User.store);
routes.post('/singin', User.singin);

routes.use(authMiddleware);

routes.get('/user', User.index);
routes.put('/user/:id', User.update);
routes.delete('/user/:id', User.delete);

routes.post('/book', Book.store);
routes.get('/book', Book.index);
routes.put('/book/:id', Book.update);
routes.delete('/book/:id', Book.delete);

module.exports = routes;
