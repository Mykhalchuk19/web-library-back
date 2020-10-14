require('dotenv').config();
const { not } = require('ramda');
const { helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields } = helpers;

class UserController {
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
