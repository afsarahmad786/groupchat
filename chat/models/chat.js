const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Chat = sequelize.define("chat", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // reciever_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  message: Sequelize.STRING,
  is_read: Sequelize.INTEGER,
});

module.exports = Chat;
