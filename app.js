const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
// const MyData = require("./models/myDataSchema");

const allRoutes = require("./routes/allRoutes");
const addUserRoutes = require("./routes/addUserRoutes");

app.use(express.urlencoded({ extended: true }));

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

// auto refresh end

mongoose
  .connect(
    "mongodb+srv://bou3sa:XB1l4zga6XPZXPs8@cluster0.2jyk2fo.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`my app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(console.log("Error connecting to MongoDB:", err));
  });

app.use(allRoutes);
app.use("/user/add.html", addUserRoutes);
