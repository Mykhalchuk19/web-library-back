exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('username', 255).unique().notNullable();
  table.string('firstname', 255).notNullable();
  table.string('lastname', 255).notNullable();
  table.string('email', 255).notNullable();
  table.string('password', 255).notNullable();
  table.string('salt', 255).notNullable();
});

exports.down = (knex) => knex.schema.dropTable('users');
