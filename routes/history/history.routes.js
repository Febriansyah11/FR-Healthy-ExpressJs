var express = require('express');
var router = express.Router();
const historyController = require('../../controllers/history/history.controller')

/* GET users listing. */
router.get('/get-history', historyController.getHistory);
router.post('/create-history', historyController.createHistory);

// console.log("🚀 ~ file: history.routes.js ~ line 7 ~ history")


module.exports = router;