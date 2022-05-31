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
    status,
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

// ============================================================================
// =================<<< Update Bike >>>========================================
// ============================================================================

exports.updatebike = async (req, res, next) => {
  try {
    const bike = await Bike.findById(req.params.bikeId);
    if (bike) {
      const updatedBike = await Bike.findByIdAndUpdate(
        req.params.bikeId,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedBike);
    }
  } catch (error) {
    res.status(500);
    throw new Error('Bike Update Failed');
  }
};

// ============================================================================
// =================<<< Delete Bike >>>========================================
// ============================================================================
