const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .sendStatus(401)
      .json({ message: 'Not Authorized: NOT TOKEN Invalid Token' });
  }

  console.log('VERIFY');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
