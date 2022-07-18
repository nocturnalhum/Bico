const User = require('../models/User');

// ============================================================================
// =================<<< Registration >>>=======================================
// ============================================================================

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Username, email, and password are required.' });
  }

  // Check for duplicate keys in DB:
  const dupKey = await User.findOne({ username });

  try {
    const user = await User.create({
      username,
      email,
      password,
      permissions: { User: 1010 },
    });
    res.status(201).json({ success: `New user ${user.username} created.` });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
