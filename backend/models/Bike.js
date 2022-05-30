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
      type: Number,
      unique: true,
      require: true,
    },
    bikeImage: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      trim: true,
    },
    category: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bike', BikeSchema);
