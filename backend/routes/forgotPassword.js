const router = require('express').Router();
const { forgotPassword } = require('../controllers/authController');

router.post('/', forgotPassword);

module.exports = router;
