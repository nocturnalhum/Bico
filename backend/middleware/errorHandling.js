const ErrorResponse = require('../utils/errorResponse');

const errorHandling = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log(error);

  if (err.code === 11000) {
    const message = `Duplicate Key Value`;
    error = new ErrorResponse(400, message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(400, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'ErrorHandler: Server Error',
  });
};

module.exports = errorHandling;
