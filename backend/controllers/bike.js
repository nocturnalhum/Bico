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
    res.status(500);
    throw new Error('Bike Registration Failed');
  }
};

// ============================================================================
// =================<<< Get Bikes >>>==========================================
// ============================================================================

exports.getbikes = async (req, res, next) => {
  try {
    const bikes = await Bike.find({});
    console.log(bikes);
    if (!bikes) {
      res.send({ success: false, message: 'Bike not found!' });
    } else {
      res.status(200).json(bikes);
    }
  } catch (error) {
    next(error.message);
  }
};

// ============================================================================
// =================<<< Update Bike >>>========================================
// ============================================================================

exports.updatebike = async (req, res, next) => {
  try {
    const bike = await Bike.findById(req.params.bikeId);
    if (!bike) {
      res.send({ success: false, message: 'Bike not found!' });
    } else {
      const updatedBike = await Bike.findByIdAndUpdate(
        req.params.bikeId,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedBike);
    }
  } catch (error) {
    next(error.message);
  }
};

// ============================================================================
// =================<<< Delete Bike >>>========================================
// ============================================================================

exports.deletebike = async (req, res, next) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.bikeId);
    if (!bike) {
      res.send({ success: false, message: 'Bike not found!' });
    } else {
      res.status(200).json({
        success: true,
        message: `Bike[Serial Number: ${bike.serialNum}] Deleted`,
      });
    }
  } catch (error) {
    next(error.message);
  }
};
