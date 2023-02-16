const jwt = require('jsonwebtoken');
const { requestError } = require('../helpers');
const { User } = require('../models/user');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer') {
          throw requestError(401, 'Not authorized')
      };
    const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
          throw requestError(401, 'Not authorized')
      };
    req.user = {
      id: user._id,
    };
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized';
      next();
    }
  }
};

module.exports = authenticate;