require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields } = helpers;

class UserController {
  static async createUser (req, res) {
    try {
      const { username, firstName, lastName, email, password } = req.body;
      const salt = 10;
      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = await UserModel.create({
        username, first_name: firstName, last_name: lastName, email, password: hashPassword, salt,
      });
      const token = jwt.sign({ username, id: newUser.id }, process.env.APP_KEY);
      return res.status(200).send({
        user: getUserFields(newUser),
        token,
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Something went wrong'
      })
    }
  }
}

module.exports = UserController;
