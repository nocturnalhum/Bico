const express = require('express');
const router = express.Router();

// Import controllers from controllers/auth.js:
const { register } = require('../controllers/auth');

router.route('/register').post(register);

module.exports = router;
