const {User} = require('../../models/user')

const current = async (req, res) => {
    const { id } = req.user;
    const user = User.findById(id);
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
  });
};

module.exports = current;