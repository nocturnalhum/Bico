const { resetPassword } = require('../controllers/authController');

const router = require('express').Router();

router.put('/:resetToken', resetPassword);

module.exports = router;
