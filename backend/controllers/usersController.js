const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ============================================================================
// =================<<< Get All Users >>>======================================
// ============================================================================
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(204).json({ message: 'No users found.' });
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// =================<<< Get User By ID >>>=====================================
// ============================================================================
exports.getUserByID = async (req, res, next) => {
  if (!req?.params?.userID) {
    return res.status(400).json({ message: 'User ID required' });
  }

  try {
    const user = await User.findById({ _id: req.params.userID });
    if (!user) {
      return res.status(404).json({
        message: `User ID ${req.params.userID} not found`,
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// =================<<< Update User >>>========================================
// ============================================================================

exports.updateUser = async (req, res, next) => {
  if (!req?.params?.userID)
    return res.status(400).json({ message: 'User ID required' });

  try {
    const user = await User.findById(req.params.userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User ID ${req.params.userID} not found`,
      });
    } else if (!req.permissions.includes(1111) && user.username !== req.user) {
      return res.status(401).json({
        success: false,
        message: 'User Update Not Authorized.',
      });
    } else {
      // Hash changed password:
      if (req?.body?.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userID,
        req.body,
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// =================<<< Delete User >>>========================================
// ============================================================================

exports.deleteUser = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'User ID required.' });
  }

  const user = await User.findById({ _id: req.body.id });

  if (!user) {
    return res.status(204).json({
      success: false,
      message: `User ID ${req.params.userID} not found`,
    });
  } else {
    try {
      const result = await user.deleteOne({ _id: req.body.id });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};
