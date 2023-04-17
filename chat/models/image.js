const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Image = sequelize.define("image", {
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

  url: Sequelize.STRING,
});

module.exports = Image;
