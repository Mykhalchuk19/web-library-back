require('dotenv').config();
const { not } = require('ramda');
const { helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields } = helpers;

class UserController {
  static async getUsersList (req, res) {
    try {
      const { page = 0, limit = 10 } = req.query;
      const validPage = parseInt(page, 10);
      const currentLimit = limit * (validPage + 1);
      const count = await UserModel.query().count('id');
      const users = await UserModel
        .query()
        .select('id', 'username', 'firstname', 'lastname', 'email')
        .limit(parseInt(currentLimit, 10))
        .orderBy('id');
      return res.status(200).send({
        limit,
        page: parseInt(validPage, 10),
        users,
        count: count[0]['count(`id`)'],
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async getUser (req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.query().findById(id);
      if (!user) {
        return res.status(400).json({ error: 'Such user does not exists' });
      }
      return res.status(200).send({
        userData: getUserFields(user),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async updateUser (req, res) {
    try {
      const { userData, id } = res.locals;
      const user = await UserModel.query().findById(id);
      if (not(user)) return res.status(400).send('User is not exists');
      const updatedUser = await user.$query().updateAndFetch(userData);
      return res.status(200).send({
        userData: getUserFields(updatedUser),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'User is not exists' });
    }
  }

  static async deleteUser (req, res) {
    try {
      const { id } = req.params;
      await UserModel.query().deleteById(id);
      return res.status(200).send({
        user: parseInt(id, 10),
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async currentUser (req, res) {
    try {
      const { id } = res.locals.userData;
      const user = await UserModel.query().findById(id);
      return res.status(200).send({
        userData: getUserFields(user),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }
}

module.exports = UserController;
