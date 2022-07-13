const router = require('express').Router();
const { getAllUsers } = require('../../controllers/usersController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/').get(verifyJWT, getAllUsers);

module.exports = router;
