const router = require('express').Router();
const { registerbike, updatebike } = require('../controllers/bike');

router.route('/registerbike').post(registerbike);
router.route('/updatebike/:bikeId').put(updatebike);

module.exports = router;