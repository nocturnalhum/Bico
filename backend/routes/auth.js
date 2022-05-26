const router = require('express').Router();

// Import controllers from controllers/auth.js:
const {
  register,
  login,
  forgotpassword,
  resetpassword,
  setProfileImage,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotpassword);
router.route('/resetpassword/:resetToken').put(resetpassword);
router.route('/setprofileimg').post(setProfileImage);

module.exports = router;
