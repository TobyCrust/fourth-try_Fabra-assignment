// models/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);

module.exports = db;

// models/user.model.js
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return User;
};
