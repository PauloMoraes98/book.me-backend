const bcrypt = require('bcrypt-nodejs');
const TokeController = require('../assets/Token');
const Sequelize = require('sequelize');
const Book = require('../models/Book');
const Op = Sequelize.Op;

module.exports = {
  async index(req, res) {
    const id_user = req.userId;
    try {
      const book = await Book.findAll({
        where: {
          id_user: {
            [Op.ne]: id_user
          }
        },
        include: [
          {association: 'books'}
        ]
      });
      
      if(!book)
        return res.status(404).json({ error: 'Cannot find book' });
      
      return res.json(book);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async indexById(req, res) {
    const id_book = req.params.id;

    try {
      const book = await Book.findOne({
        where: { 
          id: id_book,
        }, 
        include: [
          {association: 'books'}
        ]
      });
      
      if(!book)
        return res.status(404).json({ error: 'Cannot find book' });

      return res.json(book);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async store(req, res) {
    const id_user = req.userId;
    const {
      name,
      author,
      rating,
      description,
      intention,
      value,
      image
    } = req.body;

    try {  
      const book = await Book.create({
        name,
        author,
        rating,
        description,
        intention,
        value,
        image,
        id_user
      });

      if(!book)
        return res.status(400).json({ error: 'Unable to register book' });

        return res.json({
          book
        });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async update(req, res) {
    const id_user = req.userId;
    const id_book = req.params.id;

    try {
      const updated = await Book.update(
        req.body, { 
          where: { 
            id: id_book,
            id_user 
          } 
        }
      );

      if (updated) {
        const book = await Book.findOne({ 
          where: { 
            id: id_book,
            id_user 
          } 
        });

        if(!book)
          return res.status(404).json({ error: 'Cannot find book' });

        return res.json(book);
      } else {
        res.status(400).json({ error: 'Book cannot be updated!' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async delete(req, res) {
    const id_user = req.userId;
    const id_book = req.params.id;

    try {
      const book = await Book.findOne({
        where: { 
          id: id_book,
          id_user 
        }
      });
      
      if(!book)
        return res.status(404).json({ error: 'Cannot find book' });

      const deletedBook = await book.destroy(book);

      if(!deletedBook)
        return res.status(400).json({ error: 'Cannot delete book' });        

      return res.json();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },
};
