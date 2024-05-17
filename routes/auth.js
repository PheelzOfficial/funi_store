var express = require('express');
const { login, createUser, logout } = require('../controllers/auth');
const { verify } = require("../middleware/verify");
var router = express.Router();


/* GET users listing. */
router.post('/login', login);
router.get('/logout', verify, logout);
router.post('/register', createUser);

module.exports = router;
