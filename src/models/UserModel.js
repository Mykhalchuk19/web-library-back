const Sequelize = require('sequelize');

const { sequelize } = require('../../database');

const UserModel = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UserModel;
