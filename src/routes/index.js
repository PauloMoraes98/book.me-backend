const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../controllers/User')
const Book = require('../controllers/Book')

const routes = express.Router();

routes.post('/user', User.store);
routes.post('/login', User.login);

routes.use(authMiddleware);

routes.get('/user/:id', User.index);
routes.put('/user', User.update);
routes.put('/newpassword', User.updatePassword);
routes.delete('/user', User.delete);

routes.post('/users', User.indexByLocation);

routes.post('/book', Book.store);
routes.get('/book', Book.index);
routes.put('/book/:id', Book.update);
routes.delete('/book/:id', Book.delete);

routes.post('/booklike', Book.indexLike);
routes.get('/book/:id', Book.indexById);

module.exports = routes;
