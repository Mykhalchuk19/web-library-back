const Sequelize = require('sequelize');

/**
 * Connect .env file
 */
require('dotenv').config();

const {
  DATABASE_CONNECTION,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = process.env;
const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: DATABASE_CONNECTION,
  host: DATABASE_HOST,
});

module.exports = {
  sequelize,
};
