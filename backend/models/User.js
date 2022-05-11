const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
      required: true,
      min: 3,
      max: 20,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
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
      min: 6,
      select: false,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      max: 50,
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

module.exports = mongoose.model('User', UserSchema);
