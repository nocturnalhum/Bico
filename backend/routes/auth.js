const router = require('express').Router();

const { loginUser } = require('../controllers/authController');
const { logoutUser } = require('../controllers/logoutController');
const registerUser = require('../controllers/registerController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;
