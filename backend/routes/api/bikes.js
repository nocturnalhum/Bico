const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const {
  registerBike,
  getAllBikes,
  getBikeByID,
  updateBike,
} = require('../../controllers/bikesController');

router
  .route('/')
  .post(verifyJWT, registerBike)
  .get(getAllBikes)
  .put(verifyJWT, updateBike);

router.route('/:bikeID').get(getBikeByID);

module.exports = router;
