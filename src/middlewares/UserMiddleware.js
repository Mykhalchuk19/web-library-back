require('dotenv').config();
const { not } = require('ramda');

const updateUserMiddleware = async (req, res, next) => {
  const { username, firstname, lastname, email } = req.body;
  const { id } = req.params;
  if (not(username) || not(firstname) || not(lastname) || not(email)) {
    return res.status(400).send('You should input all fields');
  }
  if (not(id)) {
    return res.status(400).send('User is not exists');
  }
  res.locals.userData = { username, firstname, lastname, email };
  res.locals.id = id;
  return next();
};

module.exports = {
  updateUserMiddleware,
};
