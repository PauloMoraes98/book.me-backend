const bcrypt = require('bcrypt-nodejs');
const TokeController = require('./Token');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const {
      name,
      email,
      password,
      city,
      uf,
      latitude,
      longitude,
      bio,
      image
    } = req.body;

    const salt = bcrypt.genSaltSync(10);

    const cryptedPassword = bcrypt.hashSync(password, salt);

    try {
      if(await User.findOne({ where: { email } }))
        return res.status(400).json({ error: 'User Alredy exists' });
      
      const user = await User.create({
        name,
        email,
        password: cryptedPassword,
        city,
        uf,
        latitude,
        longitude,
        bio,
        image
      });

      if(!user)
        return res.status(400).json({ error: 'Cannot create User' });

      user.password = undefined;

      return res.json({
        user,
        token: TokeController.generateToken({ 
          id: user.id
        })
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async singin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email
        }
      });

      if(user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err, !isMatch) {
            return res.status(401).json({ error: 'User not found!' });
          }

          res.json({
            name: user.name,
            email: user.email,
            token: TokeController.generateToken({ 
              id: user.id
            })
          });
        });
      } else {
        res.status(400).json({ error: 'User not found!' });
      }
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
  },

  async update(req, res) {
    const {
      id
    } = req.params;
    const updated = await User.update(req.body, {
      where: {
        id
      }
    });

    if (updated) {
      const user = await User.findOne({
        where: {
          id
        }
      });
      return res.json(user);
    }
  },

  async delete(req, res) {
    const {
      id
    } = req.params;

    const user = await User.findOne({
      where: {
        id
      }
    })

    await user.destroy(user);

    return res.json();
  },
};
