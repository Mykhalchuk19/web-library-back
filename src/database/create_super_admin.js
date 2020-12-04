const bcrypt = require('bcrypt');
const { UserModel } = require('../models');
const { userStatuses } = require('../constants');

exports.seed = (knex) => knex('users').where('username', 'superadmin').delete();

exports.seed = (knex) => knex('users').insert({ username: 'secondsuperadmin',
  firstname: 'secondsuperadmin',
  lastname: 'secondsuperadmin',
  email: 'superadmin@gm.com',
  password: bcrypt.hashSync('123123', 10),
  salt: 10,
  type: 4,
  status: userStatuses.ACTIVE,
  activation_code: UserModel.generateCode(),
  restore_password_code: UserModel.generateCode() });
