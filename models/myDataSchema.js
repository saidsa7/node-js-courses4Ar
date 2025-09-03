const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  userNameee: String,
});

const MyData = mongoose.model("MyDataa", articleSchema);

module.exports = MyData;
