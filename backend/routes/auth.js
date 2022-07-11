const router = require('express').Router();
const { authHandler } = require('../middleware/authMiddleware');

// Import controllers from controllers/auth.js:
const {
  register,
  login,
  forgotpassword,
  resetpassword,
  setProfileImage,
  updateuser,
  getuser,
} = require('../controllers/authController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotpassword);
router.route('/resetpassword/:resetToken').put(resetpassword);
router.route('/setprofileimg').post(setProfileImage);
router.route('/getuser/:userId').get(authHandler, getuser);
router.route('/updateuser/:userId').put(authHandler, updateuser);

module.exports = router;
