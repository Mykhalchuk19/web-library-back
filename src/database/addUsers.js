const faker = require('faker');
const bcrypt = require('bcrypt');

const createFakeUser = () => ({
  username: faker.name.findName(),
  firstname: faker.name.findName(),
  lastname: faker.name.findName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync(Math.floor(Math.random() * 100000000).toString(), 10),
  salt: 10,
});
// eslint-disable-next-line func-names
exports.seed = async function(knex) {
  const fakeUsers = [];
  for (let i = 0; i <= 100; i += 1) {
    fakeUsers.push(createFakeUser());
  }
  await knex('users').insert(fakeUsers);
};
