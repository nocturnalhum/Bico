const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ============================================================================
// ==========<<< Email Validation Method >>>===================================
// ============================================================================

let validateEmail = function (email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

// ============================================================================
// ==========<<< User Schema >>>===============================================
// ============================================================================

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,

      min: 4,
      max: 24,
      unique: true,
      trim: true,
    },

    email: {
      type: String,

      unique: true,
      trim: true,
      validate: [validateEmail, 'Please enter a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
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
  const payload = {
    id: this._id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
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
