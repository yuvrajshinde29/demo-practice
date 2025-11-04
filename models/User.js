const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetToken: { type: DataTypes.STRING},
  resetTokenExpire: { type: DataTypes.DATE},
});

module.exports = User; 
