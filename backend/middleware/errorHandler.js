const { logEvents } = require('./eventLogger');

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;

// const ErrorResponse = require('../utils/errorResponse');

// const notFoundErrorHandling = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// const errorHandling = (err, req, res, next) => {
//   let error = { ...err };

//   error.message = err.message;

//   console.log(error);

//   if (err.code === 11000) {
//     const message = `User Already Exists`;
//     error = new ErrorResponse(400, message);
//   }

//   if (err.name === 'ValidationError') {
//     const message = Object.values(err.errors).map((val) => val.message);
//     error = new ErrorResponse(400, message);
//   }

//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: error.message || 'ErrorHandler: Server Error',
//   });
// };

// module.exports = { notFoundErrorHandling, errorHandling };
