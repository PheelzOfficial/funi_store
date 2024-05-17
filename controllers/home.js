const userModel = require("../models/user");
const productModel = require("../models/product");
const cartModel = require("../models/cart");

const getHome = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("index", { home: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("index", { home: true, admin, user });
      }
    } else {
      res.render("index", { home: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("index", { home: true });
  }
};

const about = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("about", { about: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("about", { about: true, admin, user });
      }
    } else {
      res.render("about", { about: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("about", { about: true });
  }
};

const blog = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("blog", { blog: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("blog", { blog: true, admin, user });
      }
    } else {
      res.render("blog", { blog: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("blog", { blog: true });
  }
};

const cart = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("cart", { cart: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }

        const carts = await cartModel
          .find({userId: user._id})
          .populate("product")
          .sort({ date: -1 });
        let totalAmount = 0;
        carts.forEach((cart) => {
          totalAmount += cart.quantity * cart.product.price;
        });

        const updatedCart = await carts.map((cart) => {
          return {
            ...cart.toObject(),
            newPrice: cart.product.price.toFixed(2),
            total: (cart.product.price * cart.quantity).toFixed(2),
          };
        });

        res.render("cart", {
          cart: true,
          admin,
          user,
          totalAmount: totalAmount.toFixed(2),
          updatedCart,
        });
      }
    } else {
      res.render("cart", { cart: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("cart", { cart: true });
  }
};

const checkout = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("checkout", { home: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("checkout", { home: true, admin, user });
      }
    } else {
      res.render("checkout", { home: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("checkout", { home: true });
  }
};

const contact = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("contact", { contact: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("contact", { contact: true, admin, user });
      }
    } else {
      res.render("contact", { contact: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("contact", { contact: true });
  }
};

const auth = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("orangelogin", { home: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("orangelogin", { home: true, admin, user });
      }
    } else {
      res.render("orangelogin", { home: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("orangelogin", { home: true });
  }
};

const services = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("services", { services: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("services", { services: true, admin, user });
      }
    } else {
      res.render("services", { services: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("services", { services: true });
  }
};

const shop = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("shop", { shop: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }

        const products = await productModel
          .find()
          .populate("postedBy")
          .sort({ date: -1 });
        res.render("shop", { shop: true, admin, user, products });
      }
    } else {
      res.render("shop", { shop: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("shop", { shop: true });
  }
};

const thankyou = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("thankyou", { home: true });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }
        res.render("thankyou", { home: true, admin, user });
      }
    } else {
      res.render("thankyou", { home: true });
    }
  } catch (err) {
    console.log(err.message);
    res.render("thankyou", { home: true });
  }
};

const addCart = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.render("shop", { shop: true, error: "User not found !" });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
        }

        const products = await productModel
          .find()
          .populate("postedBy")
          .sort({ date: -1 });
        const productId = req.params.productId;

        const product = await productModel.findOne({ _id: productId });
        if (!product) {
          return res.render("shop", {
            shop: true,
            error: "Product not found !",
          });
        }

        await cartModel.create({
          product: productId,
          userId: user._id,
        });

        res.render("shop", {
          shop: true,
          admin,
          user,
          products,
          success: "Product Added to cart successfully",
        });
      }
    } else {
      res.render("shop", {
        shop: true,
        error: "You must be logged in to add products to cart",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.render("shop", { shop: true, error: "Error Occured" });
  }
};

module.exports = {
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
  addCart,
};
