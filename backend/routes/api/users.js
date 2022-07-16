const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const {
  getAllUsers,
  getUserByID,
  deleteUser,
  updateUser,
} = require('../../controllers/usersController');
const verifyPermissions = require('../../middleware/verifyPermissions');
const { Admin, User } = require('../../config/permissions');

router
  .route('/')
  .get(verifyJWT, verifyPermissions(Admin), getAllUsers)
  .put(verifyJWT, verifyPermissions(Admin, User), updateUser)
  .delete(verifyJWT, verifyPermissions(Admin, User), deleteUser);

router
  .route('/:userID')
  .get(verifyJWT, verifyPermissions(Admin, User), getUserByID);

module.exports = router;
