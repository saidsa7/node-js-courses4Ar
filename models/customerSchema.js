const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    age: Number,
    country: { type: String, trim: true },
    gender: { type: String, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("customer", userSchema);

module.exports = User;
