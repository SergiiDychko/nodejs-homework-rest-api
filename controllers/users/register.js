const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../../models/user');
const { requestError, sendEmail } = require('../../helpers');

// адреса сервера для вставки посилання верифікації email-адреси.
const siteAdress = 'http://localhost:3000/api';


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
    if (user) throw requestError(409, 'Email in use');
  
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mailData = {
    to: email,
    subject: 'Confirm your registration',
    html: `<h1>Confirm Your Email</h1><p>You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p><p>If you did not register with us, please disregard this email.</p><a target="_blank" href="${siteAdress}/users/verify/${verificationToken}">CONFIRM YOUR EMAIL</a>`,
  };
await sendEmail(mailData);


    res.status(201).json({
      user: {
        email,
        subscription: 'starter',
        avatarURL,
      },
    });
}

module.exports = register;