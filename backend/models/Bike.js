const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      require: true,
    },
  },
  {
    bikeModel: {
      type: String,
    },
  },
  {
    serialNum: {
      type: Number,
      require: true,
    },
  },
  {
    color: {
      type: String,
    },
  },
  {
    color: {
      type: String,
    },
  },
  {
    category: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
  },
  {
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
