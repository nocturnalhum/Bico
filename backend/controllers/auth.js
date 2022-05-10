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

// ============================================================================
// ==========<<< Login User >>>================================================
// ============================================================================

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ success: false, error: 'Please provide username and password' });
  }
  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Invalid username and password',
      });
    }

    const verifiedPassword = await user.matchPasswords(password);

    if (!verifiedPassword) {
      return res.status(400).json({
        success: false,
        error: 'Invalid username and password',
      });
    }

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(
      `<< ERROR>>\n[controllers/auth.js]\Login Route: try-catch ==> `,
      error.message
    );
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
