const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ============================================================================
// ==========<<< Login User >>>================================================
// ============================================================================

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.sendStatus(401);
    }

    const validPassword = await user.validatePassword(password);

    if (validPassword) {
      const permissions = Object.values(user.permissions).filter(Boolean);
      const accessToken = user.getSignedToken();

      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      //  Save RefreshToken with current user:
      user.refreshToken = refreshToken;
      const result = await user.save();

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.json({ permissions, accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(
      `<< ERROR>>\n[controllers/authController.js]\Login Route: try-catch ==> `,
      error.message
    );
    return res.status(500).json({
      success: false,
      error: `<<controllers/authController.js>>-Login  ` + error.message,
    });
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
