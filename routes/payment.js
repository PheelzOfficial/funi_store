var express = require('express');
const { checkout } = require('../controllers/payment');
const { verify } = require("../middleware/verify");
var router = express.Router();


/* GET users listing. */
router.get("/chedkout", verify, checkout);


module.exports = router;
