const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const get_welcome = (req, res) => {
  console.log("iiiiiiiiiiiiiiiiiiiiiii");
  res.render("welcome");
};

const get_signout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const get_login = (req, res) => {
  res.render("auth/login");
};

const get_signup = (req, res) => {
  res.render("auth/signup");
};

const post_singup = async (req, res) => {
  console.log("the req.body is : ", req.body);
  try {
    // check validatioon (email and password)
    const objError = validationResult(req);
    console.log(objError.errors);
    if (objError.errors.length > 0) {
      return res.json({ arrValidationError: objError.errors });

      // return res.render("auth/signup", { errors: objError.array() });
    }
    // check if email already exists
    const isCuurrentEmail = await AuthUser.findOne({ email: req.body.email });
    if (isCuurrentEmail) {
      return res.json({ existingEmail: "email already exists" });
    }
    // create new user(line 58) and login(line 59-60)
    const newUser = await AuthUser.create(req.body);
    var token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    // insteqad of  res.redirect("/home");
    // or res.render("home") are not allowed when u use fetch in front end.
    //  i will use res.json w nseft id dial had new user.
    res.json({ id: newUser._id });
  } catch (err) {
    console.log(err);
  }
};

const post_login = async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });
    if (loginUser === null) {
      res.json({ emailErrorMsg: "email not found" });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);

      if (match) {
        console.log(match);
        var token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET_KEY);
        console.log(token);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        // res.redirect("/home");
        res.json({ id: loginUser._id });
      } else {
        res.json({ passwordErrorMsg: `wrong password for ${req.body.email}` });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  get_signout,
  get_login,
  get_signup,
  post_singup,
  post_login,
  get_welcome,
};
