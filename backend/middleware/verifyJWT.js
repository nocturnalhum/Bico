const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .sendStatus(401)
      .json({ message: 'Not Authorized: Invalid Token' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    console.log(decoded);
    req.user = decoded.UserInfo.username;
    req.permissions = decoded.UserInfo.permissions;
    next();
  });
};

module.exports = verifyJWT;
