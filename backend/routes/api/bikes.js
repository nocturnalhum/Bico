const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const {
  registerBike,
  getAllBikes,
  getBikeByID,
  updateBike,
  deleteBike,
} = require('../../controllers/bikesController');

router
  .route('/')
  .post(verifyJWT, registerBike)
  .get(getAllBikes)
  .put(verifyJWT, updateBike)
  .delete(verifyJWT, deleteBike);

router.route('/:bikeID').get(getBikeByID);

module.exports = router;
