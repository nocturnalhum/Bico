const User = require('../models/User');

// ============================================================================
// =================<<< Get All Users >>>======================================
// ============================================================================
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(204).json({ message: 'No users found.' });
  }

  console.log('USER', req.user);
  res.status(200).json(users);
};
