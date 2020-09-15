require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields } = helpers;

class UserController {
  static async createUser (req, res) {
    try {
      const { username, firstname, lastname, email, password } = req.body;
      const salt = 10;
      const hashPassword = bcrypt.hashSync(password, 10);
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
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          error: 'Something went wrong1',
        });
      }
      const user = await UserModel.query().findOne({
        username,
      });
      if (!user) {
        return res.status(400).json({
          error: 'Password or username are incorrect',
        });
      }
      const { password: passwordHash } = user;
      const isCorrect = bcrypt.compareSync(password, passwordHash);
      if (!isCorrect) {
        return res.status(400).json({
          error: 'Password or username are incorrect2',
        });
      }
      const token = jwt.sign({ username, id: user.id }, process.env.APP_KEY);
      return res.status(200).send({
        user: getUserFields(user),
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Something went wrong2',
      });
    }
  }
}

module.exports = UserController;
