const express = require("express");
const router = express.Router();
const {
  getHome,
  about,
  blog,
  cart,
  checkout,
  contact,
  auth,
  services,
  thankyou,
  shop,
  addCart
} = require("../controllers/home");
const { verify } = require("../middleware/verify");

router.get("/", verify, getHome);
router.get("/about", verify, about);
router.get("/cart/:productId", verify, addCart);
router.get("/blog", verify, blog);
router.get("/shop", verify, shop);
router.get("/cart", verify, cart);
router.get("/checkout", verify, checkout);
router.get("/contact", verify, contact);
router.get("/auth", auth);
router.get("/login", auth);
router.get("/register", auth);
router.get("/services", verify, services);
router.get("/thankyou", verify, thankyou);

module.exports = router;
