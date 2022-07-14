const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const {
  getAllUsers,
  getUserByID,
  deleteUser,
} = require('../../controllers/usersController');
const verifyPermissions = require('../../middleware/verifyPermissions');
const { Admin, User } = require('../../config/permissions');

router
  .route('/')
  .get(verifyJWT, verifyPermissions(Admin), getAllUsers)
  .delete(verifyJWT, verifyPermissions(Admin, User), deleteUser);

router
  .route('/:userID')
  .get(verifyJWT, verifyPermissions(Admin, User), getUserByID);

module.exports = router;
