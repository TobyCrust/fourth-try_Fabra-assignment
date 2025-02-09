const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,  // Username should not be null
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,  // Password should not be null
  }
});

module.exports = User;