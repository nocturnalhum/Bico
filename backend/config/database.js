const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Database');
  } catch (error) {
    console.log('***Error ==> [config/database.js]***:\n', error.message);
  }
};

module.exports = connectDB;
