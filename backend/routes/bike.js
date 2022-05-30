const router = require('express').Router();
const { registerbike } = require('../controllers/bike');

router.route('/registerbike').post(registerbike);

module.exports = router;
