const { v4: uuidv4 } = require("uuid");
const productModel = require("../models/product");
const userModel = require("../models/user");

const showPost = async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.render("index", {
          error: "You are not authorised !",
          home: true,
          user,
        });
      } else {
        let admin = false;
        if (user.status === "admin") {
          admin = true;
          res.render("post-product", { post: true, admin, user });
        } else {
          return res.render("index", {
            error: "You are not authorised !",
            home: true,
            user,
          });
        }
      }
    } else {
      return res.render("index", {
        error: "You are not authorised !",
        home: true,
        user,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.render("home", { home: true, error: "Error occured !" });
  }
};

const postProduct = async (req, res) => {
  try {
    if (req.user) {
      const userEmail = req.user.email;
      const user = await userModel.findOne({ email: userEmail });
      if (!user) {
        return res.render("index", {
          error: "You are not authorized !",
          user,
          home: true,
        });
      }

      if (user.status !== "admin") {
        return res.render("index", {
          error: "You are not authorized !",
          user,
          home: true,
        });
      }

      const { title, price } = req.body;
      if (!title || !price || !req.files.image) {
        console.log(title, price)
        console.log(req.files.image)
        return res.render("post-product", {
          error: "fill in all input fields",
        });
      }

      // image.png
      // ["image", "png"]

      const image = req.files.image;
      const imageName = image.name;
      const extentionName = imageName.split(".").pop();
      const uniqueName = `${uuidv4()}.${extentionName}`;
      const filePath = `public/upload/${uniqueName}`;
      await image.mv(filePath);

      await productModel.create({
        title: title,
        price: Number(price),
        image: `/upload/${uniqueName}`,
        postedBy: user._id,
      });

      res.render("post-product", {
        post: true,
        success: "Product posted successfully",
        user,
        post: true,
      });
    } else {
      res.render("index", {
        home: true,
        error: "You are not authorised",
        home: true,
        user,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.render("index", { home: true, error: "Error Occured", home: true });
  }
};

module.exports = { postProduct, showPost };
