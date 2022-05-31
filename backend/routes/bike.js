const router = require('express').Router();
const {
  registerbike,
  getbikes,
  updatebike,
  deletebike,
} = require('../controllers/bike');

router.route('/registerbike').post(registerbike);
router.route('/').get(getbikes);
router.route('/updatebike/:bikeId').put(updatebike);
router.route('/deletebike/:bikeId').delete(deletebike);

module.exports = router;
