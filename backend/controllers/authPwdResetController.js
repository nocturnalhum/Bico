const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ============================================================================
// ==========<<< Forgot Password >>>===========================================
// ============================================================================
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      next(new ErrorResponse(404, 'Email Could Not Be Sent'));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
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

exports.resetPassword = async (req, res, next) => {
  console.log(req.params.resetToken);
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
    });
  } catch (error) {
    next(error);
  }
};
