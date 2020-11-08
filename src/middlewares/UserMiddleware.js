require('dotenv').config();
const { not } = require('ramda');

const updateUserMiddleware = async (req, res, next) => {
  const { username, firstname, lastname, email, type } = req.body;
  const { id } = res.locals;
  if (not(username) || not(firstname) || not(lastname) || not(email) || not(type)) {
    return res.status(400).json({ error: 'You should input all fields' });
  }
  if (not(id)) {
    return res.status(400).json({ error: 'User is not exists' });
  }
  res.locals.userData = { username, firstname, lastname, email, type };
  return next();
};

const updateProfileMiddleware = async (req, res, next) => {
  const { id } = res.locals;
  const { username, firstname, lastname, email, type, id: requestId } = req.body;
  if (requestId && requestId !== id) {
    return res.status(403).json({
      error: 'You are not authorized',
    });
  }
  if (not(username) || not(firstname) || not(lastname) || not(email) || not(type)) {
    return res.status(400).json({ error: 'You should input all fields' });
  }
  res.locals.userData = { username, firstname, lastname, email, type };
  return next();
};

module.exports = {
  updateUserMiddleware,
  updateProfileMiddleware,
};
