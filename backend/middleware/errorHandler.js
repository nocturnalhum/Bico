const ErrorResponse = require('../utils/errorResponse');
const { logEvents } = require('./eventLogger');

const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    logEvents(
      `Code:${err.code || 500}\t${err.name}: ${err.message}`,
      'errLog.txt'
    );
    return res.status(400).send(err.message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message);
    logEvents(`Code:${err.code || 500}\t${err.name}: ${message}`, 'errLog.txt');
    return res.status(401).send(message);
  }

  console.log(err.message);

  logEvents(
    `Code:${err.code || 500}\t${err.name}: ${err.message}`,
    'errLog.txt'
  );
  return res
    .status(err.code || 500)
    .json({ success: false, error: err.message || 'Server Error' });
};

module.exports = errorHandler;
