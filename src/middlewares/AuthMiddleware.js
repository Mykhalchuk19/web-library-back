require('dotenv').config();
const { not, or } = require('ramda');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');
const { userStatuses } = require('../constants');

const secretKey = process.env.APP_KEY || 'mysecretkeyforweblibrary12412412434';

const createUserMiddleware = async (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (not(username) || not(firstname) || not(lastname) || not(email) || not(password)) {
    return res.status(400).json({ error: 'You should input all fields' });
  }
  const userByUsername = await UserModel.query().findOne({
    username,
  });
  const userByEmail = await UserModel.query().findOne({
    email,
  });
  if (userByUsername && userByUsername.username === username) {
    return res.status(400).json({ error: 'Username should be unique' });
  }
  if (userByEmail && userByEmail.email === email) {
    return res.status(400).json({ error: 'Email should be unique' });
  }
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, 10);
  const activationCode = UserModel.generateCode();
  const restorePasswordCode = UserModel.generateCode();
  res.locals.userData = {
    salt,
    hashPassword,
    status: userStatuses.PENDING,
    activationCode,
    restorePasswordCode,
  };
  return next();
};

const activateAccountMiddleware = async (req, res, next) => {
  const { id, code } = req.body;
  const user = await UserModel.query().findById(id);
  if (!user) {
    return res.status(400).json({
      error: 'User is not exists',
    });
  }
  if (!UserModel.checkActivationCode(user.activation_code, code)) {
    return res.status(400).json({
      error: 'Activation code is incorrect',
    });
  }
  res.locals.userData = {
    id,
  };
  return next();
};

const authUserMiddleware = async (req, res, next) => {
  const { username, password } = req.body;
  if (or(not(username), not(password))) {
    return res.status(400).json({
      error: 'You need to input all fields',
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
      error: 'Password or username are incorrect',
    });
  }
  if (user.status !== userStatuses.ACTIVE) {
    return res.status(403).json({
      error: 'Your status is not active',
    });
  }
  const token = jwt.sign({ username, id: user.id }, secretKey);
  res.locals.userData = {
    id: user.id,
    token,
  };
  return next();
};

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      error: 'You are not authorized',
    });
  }
  const decodedToken = jwt.verify(token.slice(7), secretKey);
  const { id } = decodedToken;

  const user = await UserModel.query().findById(id);
  if (!user) {
    return res.status(400).json({
      error: 'Such user is not exists',
    });
  }
  res.locals.id = id;

  return next();
};

const forgotPasswordMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.query().findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      error: 'This email is not exists',
    });
  }
  res.locals.userData = {
    id: user.id,
    email: user.email,
    restorePasswordCode: user.restore_password_code,
  };
  return next();
};

const resetPasswordMiddleware = async (req, res, next) => {
  const { id, code, password } = req.body;
  const user = await UserModel.query().findById(id);
  if (!user) {
    return res.status(400).json({
      error: 'This user is not exists',
    });
  }
  if (!UserModel.checkResetPasswordCode(user.restore_password_code, code)) {
    return res.status(400).json({
      error: 'Reset password code is incorrect',
    });
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  res.locals.userData = {
    id, hashPassword,
  };
  return next();
};

module.exports = {
  createUserMiddleware,
  activateAccountMiddleware,
  authUserMiddleware,
  auth,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
};
