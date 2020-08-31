const Sequelize = require('sequelize');
const UserModel = require('./UserModel');
const { sequelize } = require('../../database');

module.exports = {
  UserModel,
};

const user = new UserModel(sequelize, Sequelize);
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });
