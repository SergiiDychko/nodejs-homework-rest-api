const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { requestError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw requestError(401, "Email or password is wrong");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw requestError(401, "Email or password is wrong");
  const token = "exampletoken";

  res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
