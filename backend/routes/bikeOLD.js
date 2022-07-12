const router = require('express').Router();
const { authHandler } = require('../middleware/authMiddleware');

const {
  registerbike,
  getbikes,
  getbikebyid,
  updatebike,
  deletebike,
} = require('../controllers/bikesController');

router.route('/registerbike').post(authHandler, registerbike);
router.route('/').get(getbikes);
router.route('/getbikebyid/:bikeId').get(getbikebyid);
router.route('/updatebike/:bikeId').put(authHandler, updatebike);
router.route('/deletebike/:bikeId').delete(authHandler, deletebike);

module.exports = router;
