const Sequelize = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define("OAuth", {
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  salesforceOAuth: Sequelize.TEXT,
});
