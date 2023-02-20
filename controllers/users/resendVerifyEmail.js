const { User } = require('../../models/user');
const {sendEmail, requestError} = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw requestError(404, 'Not found');
  if (user.verify) {
      throw requestError(400, 'Verification has already been passed');
  }

  const mailData = {
    to: email,
    subject: 'Resend confirmation',
    html: `<h1>Confirm Your Email</h1><p>You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p><p>If you did not register with us, please disregard this email.</p><a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">CONFIRM YOUR EMAIL</a>`,
  };
  await sendEmail(mailData);

  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;