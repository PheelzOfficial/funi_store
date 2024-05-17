const express = require("express");
const expresshandlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const indexRouter = require("./routes/home");
const payment = require("./routes/payment");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
require("dotenv").config();
const { verify } = require("./middleware/verify");
const expressFileUpload = require("express-fileupload")

const app = express();

mongoose
  .connect(process.env.mongoose)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.engine(
  "hbs",
  expresshandlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

// view engine setup
app.set("view engine", "hbs");

app.use(cookieParser());
app.use(expressFileUpload());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);
app.use("/", authRoutes);
app.use("/", payment);
app.use("/admin", adminRoutes);

app.get("*", verify, (req, res) => {
  if (req.user) {
    res.render("index", { error: "Page not found !", home: true, user: true });
  } else {
    res.render("index", { error: "Page not found !", home: true });
  }
});

app.listen(4005, () => {
  console.log("listening on port ....... 4005");
});
