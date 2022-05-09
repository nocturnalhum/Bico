const router = require('express').Router();
const User = require('../models/User');

// ============================================================================
// =================<<< Registration >>>=======================================
// ============================================================================

exports.register = async (req, res, next) => {
  const { username, email, password, profilePicture } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
      profilePicture,
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
