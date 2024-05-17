var express = require('express');
const { postProduct, showPost } = require('../controllers/admin');
const { verify } = require("../middleware/verify");
var router = express.Router();


/* GET users listing. */
router.post("/post-product", verify, postProduct);
router.get("/post-product", verify, showPost);


module.exports = router;
