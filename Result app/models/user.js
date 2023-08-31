const DataTypes = require("sequelize");
const sequelize = require('../Database/connection');

// The sequelize.define() method defines a new model, which represents a table in the database.
module.exports = sequelize.define("Users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: false, // Disable timestamps
  });