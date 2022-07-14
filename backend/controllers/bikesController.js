const router = require('express').Router();
const Bike = require('../models/Bike');
const ErrorResponse = require('../utils/errorResponse');

// ============================================================================
// =================<<< Register Bike >>>======================================
// ============================================================================

exports.registerBike = async (req, res) => {
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

exports.getAllBikes = async (req, res) => {
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

exports.getBikeByID = async (req, res) => {
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

exports.updateBike = async (req, res) => {
  console.log('TEST', req.user);
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter required.' });
  }

  try {
    const bike = await Bike.findById(req.body.id);
    if (!bike) {
      return res
        .status(204)
        .json({ message: `Bike ${req.body.id} not found.` });
    } else if (req.user !== bike.username) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to update this bike.' });
    } else {
      const updatedBike = await Bike.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(updatedBike);
    }
  } catch (error) {
    console.log(error);
  }
};

// ============================================================================
// =================<<< Delete Bike >>>========================================
// ============================================================================

exports.deleteBike = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter required.' });
  }
  try {
    const bike = await Bike.findById(req.body.id);
    if (!bike) {
      return res
        .status(204)
        .json({ message: `Bike ${req.body.id} not found.` });
    } else if (req.user !== bike.username) {
      return res
        .status(403)
        .json({ success: false, message: 'Unauthorized to delete this bike.' });
    } else {
      const result = await bike.deleteOne({ _id: req.body.id });
      res.status(200).json({
        success: true,
        message: `Bike[Serial Number: ${bike.serial}] Deleted`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
