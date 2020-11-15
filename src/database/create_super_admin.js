const bcrypt = require('bcrypt');

exports.seed = (knex) => knex('users').insert({ username: 'superadmin',
  firstname: 'superadmin',
  lastname: 'superadmin',
  email: 'superadmin@gm.com',
  password: bcrypt.hashSync('123123', 10),
  salt: 10,
  type: 4 });
