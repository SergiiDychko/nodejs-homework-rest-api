const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');
const { requestError } = require('../../helpers');


const logout = async (req, res) => {
    const {id} = req.user;
    await User.findByIdAndUpdate(id, { token: '' });
    res.status(204).json();
}

module.exports = logout;