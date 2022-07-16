const router = require('express').Router();

const {
  forgotPassword,
  resetPassword,
} = require('../controllers/authPwdResetController');

router.post('/', forgotPassword);
router.put('/:resetToken', resetPassword);

module.exports = router;
