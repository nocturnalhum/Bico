const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const {
  getAllUsers,
  getUserByID,
  deleteUser,
} = require('../../controllers/usersController');

router.route('/').get(verifyJWT, getAllUsers).delete(verifyJWT, deleteUser);

router.route('/:userID').get(verifyJWT, getUserByID);

module.exports = router;
