const router = require('express').Router();
const {
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post('/', loginUser);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);

module.exports = router;
