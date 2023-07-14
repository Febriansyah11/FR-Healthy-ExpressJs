var express = require('express');
var router = express.Router();

const userController = require('../../controllers/user/user.controller')

/* GET users listing. */
router.get('/login', userController.login);
router.get('/get-user', userController.getUser);
router.post('/registrasi', userController.registrasi);





module.exports = router;