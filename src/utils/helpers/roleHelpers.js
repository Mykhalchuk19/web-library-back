const { propEq, find, compose, prop } = require('ramda');
const { permissions } = require('../../resources');
const { roles, roleNames } = require('../../constants');

const getPermissionsForRole = (role) => compose(
  prop('permissions'),
  find(propEq('name', role === roleNames.SUPER_ADMIN ? roleNames.ADMIN : role)),
)(permissions);

const getCurrentRole = (type) => compose(
  prop('name'),
  find(propEq('type', type)),
)(roles);

const getAccessByRole = (role, module, action) => compose(
  prop(action),
  find(propEq('module', module)),
)(getPermissionsForRole(role));

module.exports = {
  getPermissionsForRole,
  getCurrentRole,
  getAccessByRole,
};
