var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'healty db' });
});


router.post('/quotes', (req, res) => {
  return console.log(req.body, 'asas')
})
// e9e826d74cbf61ad3643fd9e97fab83aaef580b
router.use('/weight', require('./weight/weight.routes'))
router.use('/water', require('./water/water.routes'))
router.use('/sleep', require('./sleep/sleep.routes'))
router.use('/calorie', require('./calorie/calorie.routes'))
router.use('/history', require('./history/history.routes'))

router.use('/users', require('./users/users.routes'))






module.exports = router;
