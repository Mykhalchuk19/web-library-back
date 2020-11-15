require('dotenv').config();
const { services, helpers } = require('../utils');
const { UserModel } = require('../models');

const { getUserFields } = helpers;
const { MailService } = services;
const mailService = new MailService();

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
