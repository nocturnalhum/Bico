const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      require: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    serial: {
      type: String,
      unique: true,
      require: true,
    },

    username: {
      type: String,
      require: true,
    },
    bikeImage: {
      type: String,
      default: '/placeholderBike.jpg',
    },
    color: {
      type: String,
      trim: true,
    },
    bikeType: {
      type: String,
    },
    status: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bike', BikeSchema);
