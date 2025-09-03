const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
const userController = require("../controllers/userController");
const moment = require("moment");
// get request :
router.get("/", userController.user_index_get);

// router.get("/index.html", );

router.get("/edit/:id", userController.user_edit_get);

router.get("/view/:id", userController.user_view_get);
// post request

router.post("/search", userController.user_search_post);

// delete request
router.delete("/edit/:id", userController.user_delete);

// put request
router.put("/edit/:id", userController.user_put);

module.exports = router;
