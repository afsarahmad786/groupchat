const path = require("path");

const express = require("express");
const userAuthenticate = require("../middleware/auth");
const usercontroller = require("../controllers/user");

const router = express.Router();

router.get("/register", usercontroller.registerpage);
router.post("/register", usercontroller.register);

router.get("/login", usercontroller.loginpage);
router.post("/login", usercontroller.login);

router.get("/users", userAuthenticate.authenticate, usercontroller.getuser);
router.get("/user", userAuthenticate.authenticate, usercontroller.getcurrent);

router.get("/", (req, res) => {
  res.send("Hello World2!");
});

module.exports = router;
