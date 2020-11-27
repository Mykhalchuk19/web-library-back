const { not } = require('ramda');

const createAuthorMiddleware = async (req, res, next) => {
  const { firstname, lastname } = req.body;
  if (not(firstname)) {
    return res.status(400).json({ error: 'You should input first name of author' });
  }
  res.locals.authorData = {
    firstname,
    lastname,
  };
  return next();
};

const updateAuthorMiddleware = async (req, res, next) => {
  const { firstname, lastname } = req.body;
  const { id } = req.params;
  if (not(id)) {
    return res.status(400).json({ error: 'This author is not exists' });
  }
  if (not(firstname)) {
    return res.status(400).json({ error: 'You should input first name of author' });
  }
  res.locals.authorData = {
    firstname,
    lastname,
  };
  return next();
};

module.exports = {
  createAuthorMiddleware,
  updateAuthorMiddleware,
};
