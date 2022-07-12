const router = require('express').Router();
const registerUser = require('../controllers/registerController');

router.post('/', registerUser);

module.exports = router;
