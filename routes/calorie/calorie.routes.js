var express = require('express');
var router = express.Router();
const calorieController = require('../../controllers/calorie/calorie.controller')

/* GET users listing. */
router.get('/get-calorie', calorieController.getCalorie);
router.get('/select-calorie', calorieController.selectCalorie);

module.exports = router;