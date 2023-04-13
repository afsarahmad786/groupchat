const path = require("path");

const express = require("express");
const userAuthenticate = require("../middleware/auth");
const chatcontroller = require("../controllers/chat");

const router = express.Router();

// router.get("/register", usercontroller.registerpage);
router.post(
  "/chat/send",
  userAuthenticate.authenticate,
  chatcontroller.sendmessage
);

router.get(
  "/chat/send",
  userAuthenticate.authenticate,
  chatcontroller.chatpage
);
router.get("/chat/get", userAuthenticate.authenticate, chatcontroller.getchat);
router.get(
  "/chat/getmessage",
  userAuthenticate.authenticate,
  chatcontroller.getnewchat
);

router.post(
  "/create-group",
  userAuthenticate.authenticate,
  chatcontroller.creategroup
);

router.get(
  "/group/create",
  userAuthenticate.authenticate,
  chatcontroller.creategroup
);

router.get("/groups", userAuthenticate.authenticate, chatcontroller.getgroup);

router.get("/group", userAuthenticate.authenticate, chatcontroller.grouppage);

router.get(
  "/groupchat",
  userAuthenticate.authenticate,
  chatcontroller.getgroupchat
);
router.get(
  "/participents",
  userAuthenticate.authenticate,
  chatcontroller.getparticipent
);
router.get(
  "/makeadmin",
  userAuthenticate.authenticate,
  chatcontroller.makeadmin
);
router.get(
  "/removeuser",
  userAuthenticate.authenticate,
  chatcontroller.removeuser
);

router.get("/adduser", userAuthenticate.authenticate, chatcontroller.adduser);
router.post(
  "/adduser",
  userAuthenticate.authenticate,
  chatcontroller.addparticipent
);
module.exports = router;
