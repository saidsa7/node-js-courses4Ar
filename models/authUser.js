const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define the Schema (the structure of the article)
const authUserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profileImage: String,

  customerInfo: [
    {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      email: { type: String, trim: true },
      phoneNumber: { type: String, trim: true },
      age: Number,
      country: { type: String, trim: true },
      gender: { type: String, trim: true },
      createdAt: Date,
      updatedAt: Date,
      // updatedAt: { type: Date, default: Date.now},
    },
  ],
});

authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Create a model based on that schema
const AuthUser = mongoose.model("User", authUserSchema);

// export the model
module.exports = AuthUser;
