const { omit, path } = require('ramda');

const getUserFields = (user) => omit(['password', 'salt'], path(['dataValues'], user));

module.exports = getUserFields;
