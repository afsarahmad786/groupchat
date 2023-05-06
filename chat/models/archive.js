const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ArchiveChat = sequelize.define("archivechat", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  imageId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  message: Sequelize.STRING,
  is_read: Sequelize.INTEGER,
});

module.exports = ArchiveChat;
