const router = require('express').Router();
const {
  registerBike,
  getAllBikes,
} = require('../../controllers/bikesController');

router.route('/').post(registerBike).get(getAllBikes);

module.exports = router;
