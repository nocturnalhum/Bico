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

// ============================================================================
// =================<<< Get User By ID >>>=====================================
// ============================================================================
exports.getUserByID = async (req, res) => {
  if (!req?.params?.userID) {
    return res.status(400).json({ message: 'User ID required' });
  }

  const user = await User.findById({ _id: req.params.userID }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ${req.params.userID} not found.` });
  }

  res.json(user);
};

// ============================================================================
// =================<<< Delete User >>>========================================
// ============================================================================

exports.deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'User ID required.' });
  }

  const user = await User.findById({ _id: req.body.id });

  if (!user) {
    return res.status(204).json({ message: `User ${req.body.id} not found.` });
  }

  const result = await user.deleteOne({ _id: req.body.id });

  res.json(result);
};
