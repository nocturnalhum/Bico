const router = require('express').Router();
const {
  getAllUsers,
  getUserByID,
} = require('../../controllers/usersController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/').get(verifyJWT, getAllUsers);

router.route('/:userID').get(verifyJWT, getUserByID);

module.exports = router;
