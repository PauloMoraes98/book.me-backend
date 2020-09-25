const jwt = require('jsonwebtoken');

module.exports = {
  generateToken(params = {}) {
    return jwt.sign(params, process.env.AUTH_SECRET);
  }
}
