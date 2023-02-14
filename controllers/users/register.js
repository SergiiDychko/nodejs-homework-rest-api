const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const user = await User.findOne({ email });
    if (user) throw requestError(409, 'Email in use');
    const result = await User.create({ name, email, password });
    res.status(201).json({
      user: {
        email,
        subscription: 'starter',
      },
    });
}

module.exports = register;