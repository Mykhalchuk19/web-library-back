const { omit } = require('ramda');

const getUserFields = (user) => omit(['password', 'salt'], user);

module.exports = getUserFields;
