const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize("groupchat", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
