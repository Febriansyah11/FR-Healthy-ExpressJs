var express = require('express');
var router = express.Router();
const sleepController = require('../../controllers/sleep/sleep.controller')

/* GET users listing. */
router.get('/get-sleep', sleepController.getSleep);
router.get('/select-sleep', sleepController.selectSleep);


module.exports = router;