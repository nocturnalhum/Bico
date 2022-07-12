const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const {
  registerBike,
  getAllBikes,
  getBikeByID,
} = require('../../controllers/bikesController');

router.route('/').post(verifyJWT, registerBike).get(getAllBikes);

router.route('/:bikeID').get(getBikeByID);

module.exports = router;
