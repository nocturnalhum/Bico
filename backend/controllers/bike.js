const router = require('express').Router();
const Bike = require('../models/Bike');
const ErrorResponse = require('../utils/errorResponse');

// ============================================================================
// =================<<< Register Bike >>>======================================
// ============================================================================

exports.registerbike = async (req, res, next) => {
  const {
    manufacturer,
    bikeModel,
    serialNum,
    bikeImage,
    color,
    category,
    description,
  } = req.body;
  try {
    const bike = await Bike.create({
      manufacturer,
      bikeModel,
      serialNum,
      bikeImage,
      color,
      category,
      description,
    });
    res.status(201).json({
      success: true,
      data: bike,
    });
  } catch (error) {
    console.log(error);
  }
};
