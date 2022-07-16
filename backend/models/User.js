const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ============================================================================
// ==========<<< Email Validation Method >>>===================================
// ============================================================================

let validateEmail = function (email) {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

// ============================================================================
// ==========<<< User Schema >>>===============================================
// ============================================================================

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      min: 4,
      max: 24,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Please provide email address'],
      unique: true,
      trim: true,
      validate: [validateEmail, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      require: true,
      min: 8,
      select: false,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    bikes: {
      type: Array,
      default: [],
    },
    permissions: {
      User: { type: Number, default: 1010 },
      Admin: Number,
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// ============================================================================
// ==========<<< Password Hashing Method >>>===================================
// ============================================================================

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ============================================================================
// ==========<<< Password Matching Method >>>==================================
// ============================================================================

UserSchema.methods.validatePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

// ============================================================================
// ==========<<< Get Signed Token Method >>>===================================
// ============================================================================
UserSchema.methods.getSignedToken = function () {
  const permissions = Object.values(this.permissions).filter(Boolean);
  const payload = {
    UserInfo: {
      username: this.username,
      permissions: permissions,
    },
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1200s',
  });
};

// ============================================================================
// ==========<<< Create Reset Token >>>========================================
// ============================================================================
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token (private key) and save to the database:
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
