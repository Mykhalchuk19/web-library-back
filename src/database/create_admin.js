const bcrypt = require('bcrypt');

exports.seed = (knex) => knex('users').insert({ username: 'admin',
  firstname: 'admin',
  lastname: 'admin',
  email: 'admin',
  password: bcrypt.hashSync('123123', 10),
  salt: 10,
  type: 3 });
