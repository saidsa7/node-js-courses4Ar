const express = require("express");
const router = express.Router();
// const User = require("../models/customerSchema"); hit kain db f userController.js (lev1)
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const moment = require("moment");
const AuthUser = require("../models/authUser");
const jwt = require("jsonwebtoken");
const { requireAuth, checkIfUser } = require("../middleware/middleware");
const { check, validationResult } = require("express-validator");
const multer = require("multer");

const upload = multer({ storage: multer.diskStorage({}) });

router.use(checkIfUser);

// LEVEL 3

// ✅ رفع الصورة عند تحديث الملف الشخصي

router.post(
  "/update-profile",
  upload.single("avatar"),
  authController.post_profileImage
);

// router.post(
//   "/update-profile",
//   upload.single("avatar"),
//   function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log("the req.file : ", req.file);

//     // Upload an image
//     cloudinary.uploader.upload(req.file.path, (error, result) => {
//       console.log("the result : ", error, "the error : ", result);
//     });
//   }
// );

// LEVEL 2

router.get("/signout", authController.get_signout);

router.get("/login", authController.get_login);

router.get("/signup", authController.get_signup);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  authController.post_singup
);

router.post("/login", authController.post_login);

router.get("/", authController.get_welcome);
// LEVEL 1
// get request :
router.get("/home", requireAuth, userController.user_index_get);

// router.get("/index.html", );

router.get("/edit/:id", requireAuth, userController.user_edit_get);

router.get("/view/:id", requireAuth, userController.user_view_get);
// post request

router.post("/search", userController.user_search_post);

// delete request
router.delete("/edit/:id", userController.user_delete);

// put request
router.put("/edit/:id", userController.user_put);

module.exports = router;
