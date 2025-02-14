const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log // Enable SQL query logging
});

module.exports = sequelize;
