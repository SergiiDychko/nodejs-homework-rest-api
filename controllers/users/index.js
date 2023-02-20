const register = require('./register');
const login = require('./login');
const current = require('./current');
const updAvatar = require('./updAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
  register,
  login,
  current,
  updAvatar,
  verifyEmail,
  resendVerifyEmail,
};
