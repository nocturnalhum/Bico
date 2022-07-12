const router = require('express').Router();
const Bike = require('../models/Bike');
const ErrorResponse = require('../utils/errorResponse');

// ============================================================================
// =================<<< Register Bike >>>======================================
// ============================================================================

exports.registerBike = async (req, res, next) => {
  if (!req?.body.brand || !req?.body.model || !req?.body.serial)
    return res
      .status(400)
      .json({ message: 'Brand, model, serial are required.' });

  const {
    brand,
    model,
    serial,
    username,
    bikeImage,
    color,
    bikeType,
    description,
    status,
  } = req.body;
  try {
    const bike = await Bike.create({
      brand,
      model,
      serial,
      username,
      bikeImage,
      color,
      bikeType,
      description,
      status,
    });
    res.status(201).json({ bike });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error('Bike Registration Failed');
  }
};

// ============================================================================
// =================<<< Get All Bikes >>>==========================================
// ============================================================================

exports.getAllBikes = async (req, res, next) => {
  try {
    const bikes = await Bike.find();
    if (!bikes) {
      res.status(204).json({ success: false, message: 'Bikes not found!' });
    } else {
      res.status(200).json(bikes);
    }
  } catch (error) {
    console.error(error);
  }
};

// ============================================================================
// =================<<< Get Bike By ID >>>=====================================
// ============================================================================

exports.getBikeByID = async (req, res, next) => {
  if (!req?.params?.bikeID) {
    return res.status(400).json({ message: 'bikeID parameter required.' });
  }
  try {
    const bike = await Bike.findById(req.params.bikeID).exec();
    if (!bike) {
      return res
        .status(204)
        .json({ message: `Bike ${req.params.bikeID} not found.` });
    } else {
      res.status(200).json(bike);
    }
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
    next(error);
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
        message: `Bike[Serial Number: ${bike.serial}] Deleted`,
      });
    }
  } catch (error) {
    next(error);
  }
};
