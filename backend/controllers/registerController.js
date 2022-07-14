const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ============================================================================
// =================<<< Registration >>>=======================================
// ============================================================================

const registerUser = async (req, res) => {
  const { username, email, password, profilePicture } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Username, email, and password are required.' });
  }

  // Check for duplicate keys in DB:
  const dupKey = await User.findOne({ username }).exec();

  if (dupKey) return res.sendStatus(409);
  try {
    const user = await User.create({
      username,
      email,
      password,
      profilePicture,
      permissions: { User: 0001 },
    });
    res.status(201).json({ success: `New user ${user.username} created.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
