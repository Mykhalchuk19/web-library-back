require('dotenv').config();
const jwt = require('jsonwebtoken');

const { services, helpers } = require('../utils');
const { UserModel } = require('../models');
const { userStatuses } = require('../constants');

const { getUserFields } = helpers;
const { MailService } = services;
const mailService = new MailService();

const secretKey = process.env.APP_KEY || 'mysecretkeyforweblibrary12412412434';

class AuthController {
  static async createUser (req, res) {
    try {
      const { username, firstname, lastname, email } = req.body;
      const { salt, hashPassword, activationCode, status } = res.locals.userData;
      const user = await UserModel.query().insert({
        username,
        firstname,
        lastname,
        email,
        password: hashPassword,
        salt,
        status,
        activation_code: activationCode,
      });

      await mailService.sendMail({
        from: process.env.GMAIL_USER_NAME,
        to: email,
        subject: 'Confirm your account',
        template: 'confirm',
        context: {
          href: `${process.env.FRONT_END_URL}auth/activate-account/${user.id}/${activationCode}`,
        },
      });
      return res.status(200).json({
        success: 'Check you email address',
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }
  }

  static async activateAccount (req, res) {
    try {
      const { id } = res.locals.userData;
      const user = await UserModel.query().findById(id);
      const updatedUser = await user.$query().updateAndFetch({ status: userStatuses.ACTIVE });
      const token = jwt.sign({ username: updatedUser.username, id: updatedUser.id }, secretKey);
      return res.status(200).send({
        userData: getUserFields(updatedUser),
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Something went wrong',
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
        error: 'Something went wrong',
      });
    }
  }
}

module.exports = AuthController;
