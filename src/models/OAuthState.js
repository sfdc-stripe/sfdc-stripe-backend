const Sequelize = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define("OAuthState", {
  state: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  referer: Sequelize.STRING,
});
