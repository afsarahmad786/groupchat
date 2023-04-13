const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Participant = sequelize.define("participant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: false,
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Participant;
