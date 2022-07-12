const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const {
  registerBike,
  getAllBikes,
} = require('../../controllers/bikesController');

router.route('/').post(verifyJWT, registerBike).get(getAllBikes);

module.exports = router;
