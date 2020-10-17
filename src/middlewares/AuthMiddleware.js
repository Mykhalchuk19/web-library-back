require('dotenv').config();
const { not, or } = require('ramda');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const secretKey = process.env.APP_KEY || 'mysecretkeyforweblibrary12412412434';

const createUserMiddleware = async (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (not(username) || not(firstname) || not(lastname) || not(email) || not(password)) {
    return res.status(400).send('You should input all fields');
  }
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, 10);
  res.locals.userData = {
    salt,
    hashPassword,
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
  const token = jwt.sign({ username, id: user.id }, secretKey);
  res.locals.userData = {
    user,
    token,
  };
  return next();
};

module.exports = {
  createUserMiddleware,
  authUserMiddleware,
};
