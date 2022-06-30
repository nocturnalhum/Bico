const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bcrypt = require('bcryptjs');

// ============================================================================
// =================<<< Registration >>>=======================================
// ============================================================================

exports.register = async (req, res, next) => {
  const { username, email, password, bikes, profilePicture } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      bikes,
      profilePicture,
    });
    res.status(201).json({
      success: true,
      token: user.getSignedToken(),
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
    return next(new ErrorResponse(400, 'Please provide username and password'));
  }

  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return next(new ErrorResponse(401, 'Invalid username and password'));
    }

    const validPassword = await user.validatePassword(password);

    if (!validPassword) {
      return next(new ErrorResponse(401, 'Invalid username and password'));
    }

    res.status(200).json({
      success: true,
      token: user.getSignedToken(),
      user,
    });
  } catch (error) {
    console.log(
      `<< ERROR>>\n[controllers/auth.js]\Login Route: try-catch ==> `,
      error.message
    );
    return res.status(500).json({
      success: false,
      error: `<<controllers/auth.js>>-Register  ` + error.message,
    });
  }
};

// ============================================================================
// ==========<<< Forgot Password >>>===========================================
// ============================================================================
exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      next(new ErrorResponse(404, 'Email Could Not Be Sent'));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `<h1>You have requested a password reset</h1><p>Please go to this link to reset your password</p><a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

    try {
      // sendEmail function from utils/sendEmail using nodemailer library:
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (error) {
      // Clear reset password token if error sending email and save user:
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ErrorResponse(500, 'Email could not be sent'));
    }
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// ==========<<< Reset Password >>>============================================
// ============================================================================

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user);

    if (!user) {
      return next(new ErrorResponse(400, 'Invalid Token'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({
      success: true,
      data: 'Password successfully updated',
      // token: user.getSignedJwtToken(),
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// =================<<< Set Profile Pic >>>====================================
// ============================================================================

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, res, cb) {
        cb(null, `profile-image-${Date.now()}.jpeg`);
      },
    }),
  });

exports.setProfileImage = (req, res, next) => {
  const uploadSingle = upload('bico-profile-images').single('croppedImage');

  uploadSingle(req, req, async (error) => {
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    console.log(req.file);
    res.status(200).json({ data: req.file.location });
  });
};

// ============================================================================
// =================<<< Get User >>>===========================================
// ============================================================================
exports.getuser = async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.send({ success: false, message: 'User not found' });
  } else {
    try {
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
};

// ============================================================================
// =================<<< Update User >>>========================================
// ============================================================================

exports.updateuser = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.send({ success: false, message: 'Update failed' });
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
};
