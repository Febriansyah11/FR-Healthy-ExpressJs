var express = require('express');
var router = express.Router();
const waterController = require('../../controllers/water/water.controller')

/* GET users listing. */
router.get('/get-water', waterController.getWater);
router.get('/select-water', waterController.waterSelect);



module.exports = router;