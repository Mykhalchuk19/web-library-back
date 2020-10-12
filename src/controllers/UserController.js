require('dotenv').config();
const jwt = require('jsonwebtoken');
const { not } = require('ramda');
const { helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields } = helpers;

class UserController {
  static async createUser (req, res) {
    try {
      const { username, firstname, lastname, email } = req.body;
      const { salt, hashPassword } = res.locals.userData;
      const newUser = await UserModel.query().insert({
        username, firstname, lastname, email, password: hashPassword, salt,
      });
      const token = jwt.sign({ username, id: newUser.id }, process.env.APP_KEY);
      return res.status(200).send({
        user: getUserFields(newUser),
        token,
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }
  }

  static async authenticateUser (req, res) {
    try {
      const { user, token } = res.locals.userData;
      return res.status(200).send({
        user: getUserFields(user),
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }
  }

  static async updateUser (req, res) {
    try {
      const { userData, id } = res.locals;
      const user = await UserModel.query().findById(id);
      if (not(user)) return res.status(400).send('User is not exists');
      const updatedUser = await user.$query().updateAndFetch(userData);
      return res.status(200).send({
        user: getUserFields(updatedUser),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send('User is not exists');
    }
  }
}

module.exports = UserController;
