const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

function checkPassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
}

// Example usage
const password = "Password123!";
console.log(checkPassword(password)); // Output: true

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email.trim() || !name.trim() || !password.trim()) {
      return res.render("orangelogin", { error: "Fill in all input(s)" });
    }

    const existing = await userModel.findOne({ email: email });
    if (existing) {
      return res.render("orangelogin", { error: "User already exists" });
    }

    if (password.length < 6) {
      return res.render("orangelogin", { error: "Password is too short" });
    }

    if (password === email) {
      return res.render("orangelogin", { error: "Pasword not allowed !" });
    }

    const checkCharacters = checkPassword(password);
    if (checkCharacters != true) {
      return res.render("orangelogin", {
        error:
          "Pasword must contain uppercase, lowercase, numbers and character !",
      });
    }

    await userModel.create({
      email: email,
      name: name,
      password: password,
    });

    res.render("orangelogin", {
      success: "Account created successfully, please login !",
    });
  } catch (err) {
    console.log(err.message);
    return res.render("orangelogin", { error: "Error occured !" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
      return res.render("orangelogin", { error: "Fill in all input(s)" });
    }

    const existing = await userModel.findOne({ email: email });
    if (!existing) {
      return res.render("orangelogin", { error: "User does not exists" });
    }

    const verifyPassword = await bcrypt.compare(password, existing.password);
    if (!verifyPassword) {
      return res.render("orangelogin", { error: "Password does not match !" });
    }
    const token = await jwt.sign({ email: email }, "Godisgood", {
      expiresIn: "3h",
    });

    res.cookie("funi_store", token);

    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    return res.render("orangelogin", { error: "Error occured !" });
  }
};

const logout = (req, res) => {
  try {
    if (req.user) {
      res.clearCookie("funi_store");
      res.render("orangelogin", { success: "Logged out successfully !" });
    } else {
      res.render("orangelogin", { error: "You are not logged in !" });
    }
  } catch (err) {
    console.log(err.message);
    res.render("index", { error: "Error occured while logging out !" });
  }
};

module.exports = { createUser, login, logout };
