const DataTypes = require("sequelize");
const sequelize = require('../Database/connection')


module.exports = sequelize.define("Students", {
  roll_no: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

