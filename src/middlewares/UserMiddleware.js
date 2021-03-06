require('dotenv').config();
const { not } = require('ramda');
const path = require('path');

const { UserModel } = require('../models');
const { imagesTypes } = require('../constants');

const updateUserMiddleware = async (req, res, next) => {
  const { username, firstname, lastname, email, type } = req.body;
  const { id } = res.locals;
  const { id: userId } = req.params;
  if (not(username) || not(firstname) || not(lastname) || not(email) || not(type)) {
    return res.status(400).json({ error: 'You should input all fields' });
  }
  if (not(id)) {
    return res.status(400).json({ error: 'User is not exists' });
  }
  const user = await UserModel.query().findById(userId);
  if (user.type === 4) return res.status(403).json({ error: 'You cannot edit super admin' });
  res.locals.userData = { username, firstname, lastname, email, type };
  return next();
};

const updateProfileMiddleware = async (req, res, next) => {
  const { id } = res.locals;
  const { username, firstname, lastname, email, type, id: requestId } = req.body;
  if (requestId && requestId !== id) {
    return res.status(401).json({
      error: 'You are not authorized',
    });
  }
  if (not(username) || not(firstname) || not(lastname) || not(email) || not(type)) {
    return res.status(400).json({ error: 'You should input all fields' });
  }
  res.locals.userData = { username, firstname, lastname, email, type };
  return next();
};

const deleteUserMiddleware = async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await UserModel.query().findById(userId);
  if (user.type === 4) return res.status(403).json({ error: 'You cannot delete super admin' });
  return next();
};

const uploadAvatarMiddleware = async (req, res, next) => {
  const { avatar } = req.body;
  const { file } = res.locals;
  const { originalname: original } = file;
  const expansion = path.extname(original).slice(1);
  if (imagesTypes.indexOf(expansion) !== -1) {
    res.locals.avatar = avatar;
    return next();
  }
  return res.status(400).json({ error: 'Allow only svg, png, jpg and jpeg formats' });
};

module.exports = {
  updateUserMiddleware,
  updateProfileMiddleware,
  deleteUserMiddleware,
  uploadAvatarMiddleware,
};
