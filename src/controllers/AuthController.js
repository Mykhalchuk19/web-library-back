require('dotenv').config();
const jwt = require('jsonwebtoken');
const { helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields } = helpers;

class AuthController {
  static async createUser (req, res) {
    try {
      const { username, firstname, lastname, email } = req.body;
      const { salt, hashPassword } = res.locals.userData;
      const newUser = await UserModel.query().insert({
        username, firstname, lastname, email, password: hashPassword, salt,
      });
      const token = jwt.sign({ username, id: newUser.id }, process.env.APP_KEY);
      return res.status(200).send({
        userData: getUserFields(newUser),
        token,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  static async authenticateUser (req, res) {
    try {
      const { user, token } = res.locals.userData;
      return res.status(200).send({
        userData: getUserFields(user),
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error,
      });
    }
  }
}

module.exports = AuthController;
