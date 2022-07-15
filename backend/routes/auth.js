const router = require('express').Router();

const { loginUser } = require('../controllers/authController');
const { logoutUser } = require('../controllers/logoutController');
const registerUser = require('../controllers/registerController');

// User Registration:
router.post('/register', registerUser);

// User Authentication:
router.route('/').post(loginUser).get(logoutUser);

module.exports = router;
