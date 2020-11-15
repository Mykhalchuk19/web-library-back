const { UserModel } = require('../models');
const { roleHelpers } = require('../utils/helpers');
const { roleNames } = require('../constants');

// eslint-disable-next-line consistent-return
const isPermission = (module, action) => async (req, res, next) => {
  const { id } = res.locals;
  const user = await UserModel.query().findById(id);
  const { type } = user;
  const role = roleHelpers.getCurrentRole(type);
  const havePermission = roleHelpers.getAccessByRole(role, module, action);
  if (role === roleNames.SUPER_ADMIN || havePermission) {
    next();
  } else {
    return res.status(403).json({
      error: 'Not allowed',
    });
  }
};

module.exports = {
  isPermission,
};
