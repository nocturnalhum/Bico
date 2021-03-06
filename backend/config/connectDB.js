const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB Database: ${connect.connection.host}`);
  } catch (error) {
    console.log('***Error ==> [config/connectDB.js]***:\n', error.message);
  }
};

module.exports = connectDB;
