const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');

const {
  getAllBikes,
  registerBike,
  updateBike,
  deleteBike,
  getBikeById,
} = require('../../controllers/bikesController');

router
  .route('/')
  .get(getAllBikes)
  .post(verifyJWT, registerBike)
  .put(verifyJWT, updateBike)
  .delete(verifyJWT, deleteBike);

router.route('/:id').get(getBikeById);

module.exports = router;
