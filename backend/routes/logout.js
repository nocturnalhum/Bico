const router = require('express').Router();
const { logoutUser } = require('../controllers/logoutController');

router.get('/', logoutUser);

module.exports = router;
