const User = require('../models/User');

const logoutUser = async (req, res) => {
  // On Client, also delete accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  // Check for refreshToken in Database:
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204); // Unauthorized
  }

  // Delete Found refreshToken:
  foundUser.refreshToken = '';
  const result = await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res
    .status(200)
    .json({ message: `User: ${foundUser.username} has logged out.` });
};

module.exports = { logoutUser };
