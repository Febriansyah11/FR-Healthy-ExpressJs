var express = require('express');
var router = express.Router();
const weightController = require('../../controllers/weight/weight.controller')

/* GET users listing. */
router.get('/get-weight', weightController.getWeight);

router.post('/count-weight', weightController.countWeight);

module.exports = router;