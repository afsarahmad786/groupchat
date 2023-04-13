const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize(
  "groupchat",
  process.env.USER_NAME,
  process.env.PASS_WORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST2,
  }
);

module.exports = sequelize;
