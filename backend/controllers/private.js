const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.getUser = async (req, res, next) => {
  console.log(req.headers);
  res.status(200).json({
    success: true,
    data: 'Getting Private User Data',
  });
};
