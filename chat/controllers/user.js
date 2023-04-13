const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { setCookie } = require("../util/setCookies");
const { Op, Model } = require("sequelize");
const Participant = require("../models/participants");

function generateAccessToken(id, name) {
  return jwt.sign(
    { userId: id, name: name },
    "987546585454566985abavchafjagjaaj1",
    {
      expiresIn: "11h",
    }
  );
}
exports.registerpage = async (req, res, next) => {
  res.sendFile("register.html", {
    root: path.join(__dirname, "../public/views"),
  });
};
exports.loginpage = async (req, res, next) => {
  res.sendFile("login.html", {
    root: path.join(__dirname, "../public/views"),
  });
};
exports.register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const insertResult = await User.create({
      name: name,
      password: hashedPwd,
      email: email,
      phone: phone,
    });
    res.json({
      message: "User Registered Successfully",
      success: true,
      data: insertResult,
    });
    // res.send(insertResult);
  } catch (error) {
    console.log(error);

    res.json({
      message: "Internal Server error Occured",
      data: error,
      status: 400,
    });
  }
};

exports.login = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const user = await User.findOne({ where: { email: email } })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.json({
        message: "User Not Found",
        status: 404,
        success: false,
      });
      res.end();
    });
  try {
    if (user) {
      const cmp = await bcrypt.compare(password, user.password);
      if (cmp) {
        setCookie(res, user, "User Logged in Successfully");
      } else {
        res.json({
          message: "Password is incorrect",
          message: "User Not Authorized",
          status: 401,
          success: false,
          // data: [],
        });
      }
    } else {
      res.json({
        message: "User Not Found",
        status: 404,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured in Login");
  }
};

exports.getuser = async (req, res, next) => {
  User.findAll({
    where: {
      id: {
        [Op.ne]: req.user.id,
      },
    },

    attributes: ["id", "name", "phone", "email"],
  })
    .then((result) => {
      console.log(result);
      res.json({
        message: "User Fetched Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
exports.getcurrent = async (req, res, next) => {
  console.log("current", req.user.id);
  User.findByPk(req.user.id, {
    attributes: ["id", "name", "phone", "email"],
    include: [
      {
        model: Participant,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      res.json({
        message: "Current User ",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
