const router = require('express').Router();
const Bike = require('../models/Bike');

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
      username: req.user,
      bikeImage,
      color,
      bikeType,
      description,
      status,
    });
    res.status(201).json({ bike });
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
  }
};

// ============================================================================
// =================<<< Update Bike >>>========================================
// ============================================================================

exports.updateBike = async (req, res, next) => {
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
    } else if (!req.permissions.includes(1111) && req.user !== bike.username) {
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
    next(error);
  }
};

// ============================================================================
// =================<<< Delete Bike >>>========================================
// ============================================================================

exports.deleteBike = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter required.' });
  }
  try {
    const bike = await Bike.findById(req.body.id);
    if (!bike) {
      return res
        .status(204)
        .json({ message: `Bike ${req.body.id} not found.` });
    } else if (!req.permissions.includes(1111) && req.user !== bike.username) {
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
    next(error);
  }
};
