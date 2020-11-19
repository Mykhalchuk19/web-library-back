require('dotenv').config();
const { not } = require('ramda');
const { helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields, roleHelpers } = helpers;
const { getPermissionsForRole, getCurrentRole } = roleHelpers;

class UserController {
  static async getUsersList (req, res) {
    try {
      const { page = 0, limit = 10, q = '' } = req.query;
      const validPage = parseInt(page, 10);
      const currentLimit = limit * (validPage + 1);
      const users = await UserModel.getUsers(currentLimit, q);
      const count = await UserModel.getCount(q);
      return res.status(200).send({
        limit: parseInt(limit, 10),
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
      const { userData } = res.locals;
      const { id } = req.params
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

  static async updateProfile (req, res) {
    try {
      const { userData, id } = res.locals;
      const user = await UserModel.query().findById(id);
      if (not(user)) return res.status(400).send('User is not exists');
      const updatedUser = await user.$query().updateAndFetch(userData);
      const permissions = UserModel.getPermissions(updatedUser.type);
      return res.status(200).send({
        userData: {
          ...getUserFields(updatedUser),
          permissions
        },
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
      const { id } = res.locals;
      const userData = await UserModel.getUserWithPermissions(id);

      return res.status(200).send({
        userData,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }
}

module.exports = UserController;
