const { omit } = require('ramda');

const getUserFields = (user) => omit(['password', 'salt', 'activation_code', 'restore_password_code'], user);

module.exports = getUserFields;
