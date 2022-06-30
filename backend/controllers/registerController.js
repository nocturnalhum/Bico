const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ============================================================================
// =================<<< Registration >>>=======================================
// ============================================================================

const registerNewUser = async (req, res) => {
  const { username, email, password, bikes, profilePicture } = req.body;
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
      bikes,
      profilePicture,
    });
    res.status(201), json({ success: `New user ${user} created.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
