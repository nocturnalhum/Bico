const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      require: true,
      trim: true,
    },
    bikeModel: {
      type: String,
      trim: true,
    },
    serialNum: {
      type: String,
      unique: true,
      require: true,
    },

    username: {
      type: String,
      unique: true,
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
