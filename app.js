var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// config mongoose
const mongoose = require("mongoose");
require("./models/category");
require("./models/product");
require("./models/user.js");
// require("./models/cart");
require("./models/productPlant");

var indexRouter = require("./routes/index");
var productRouter = require("./routes/productRoute");
let studentRouter = require("./routes/student");
var product = require("./routes/product");
var categoryRouter = require("./routes/categoryRoute");
var userRouter = require("./routes/userRoute");
// var cartRouter = require("./routes/cartRoute");
var productPlantRouter = require("./routes/productPlantRoute");

var app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-config.js");
const productPlant = require("./models/productPlant.js");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//connect database
mongoose
  .connect("mongodb://127.0.0.1:27017/MOB402_t")
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

app.use("/", indexRouter);
app.use("/san-pham", productRouter);
app.use("/sinh-vien", studentRouter);
app.use("/danh-muc", categoryRouter);
app.use("/user", userRouter);
app.use("/product", productPlantRouter);
// app.use("/cart", cartRouter);
// app.use("/product", product);


// app.use("/product", product);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
