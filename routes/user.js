const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const passport = require("passport");
const { wrapAsync } = require("../middlewares");

router.post("/signup", wrapAsync(userController.signup));
router.post("/login", passport.authenticate("local"), userController.login);
router.get("/logout", userController.logout);

module.exports = router;
