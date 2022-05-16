const express = require('express');
const router = express.Router();

// Import controllers from controllers/auth.js:
const { register, login, forgotpassword } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotpassword);

module.exports = router;
