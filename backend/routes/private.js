const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/private');
const { authHandler } = require('../middleware/authMiddleware');

router.route('/user').get(authHandler, getUser);

module.exports = router;
