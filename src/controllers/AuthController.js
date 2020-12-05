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
      const {
        salt,
        hashPassword,
        activationCode,
        status,
        restorePasswordCode,
      } = res.locals.userData;
      const user = await UserModel.query().insert({
        username,
        firstname,
        lastname,
        email,
        password: hashPassword,
        salt,
        status,
        activation_code: activationCode,
        restore_password_code: restorePasswordCode,
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
        success: 'Check your email address',
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
      await UserModel.query().updateAndFetchById(id, {
        status: userStatuses.ACTIVE,
        activation_code: null,
      });
      const userData = await UserModel.getUserWithPermissions(id);
      const token = jwt.sign({ username: userData.username, id: userData.id }, secretKey);
      return res.status(200).send({
        userData,
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
      const { id, token } = res.locals.userData;
      const userData = await UserModel.getUserWithPermissions(id);
      return res.status(200).send({
        userData,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }
  }

  static async forgotPassword (req, res) {
    const { email, id, restorePasswordCode } = res.locals.userData;
    try {
      await mailService.sendMail({
        from: process.env.GMAIL_USER_NAME,
        to: email,
        subject: 'Reset your password',
        template: 'resetPassword',
        context: {
          href: `${process.env.FRONT_END_URL}auth/reset-password/${id}/${restorePasswordCode}`,
        },
      });
      return res.status(200).json({
        success: 'Check your email address',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }
  }

  static async resetPassword (req, res) {
    try {
      const { id, hashPassword } = res.locals.userData;
      const user = await UserModel.query().findById(id);
      await user.$query().updateAndFetch({ password: hashPassword,
        restore_password_code: UserModel.generateCode() });
      return res.status(200).json({
        success: 'Your password was reset successfully',
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
