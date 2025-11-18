require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
require("dotenv").config();

// const MyData = require("./models/myDataSchema");
app.use(express.json());
const allRoutes = require("./routes/allRoutes");
const addUserRoutes = require("./routes/addUserRoutes");

app.use(express.urlencoded({ extended: true }));

// ضع الكوكي بارسر هنا قبل أي route

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("public"));
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

//  auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// auto refresh end s ez fhd
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`my app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(console.log("Error connecting to MongoDB:", err));
  });

// app.use(cookieParser());
app.use(allRoutes);
app.use("/user/add.html", addUserRoutes);
