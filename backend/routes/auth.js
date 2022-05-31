const router = require('express').Router();

// Import controllers from controllers/auth.js:
const {
  register,
  login,
  forgotpassword,
  resetpassword,
  setProfileImage,
  updateuser,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotpassword);
router.route('/resetpassword/:resetToken').put(resetpassword);
router.route('/setprofileimg').post(setProfileImage);
router.route('/updateuser/:userId').put(updateuser);

module.exports = router;
