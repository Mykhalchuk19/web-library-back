exports.up = (knex) => knex.schema.createTable('authors', (table) => {
  table.increments();
  table.string('firstname').notNullable();
  table.string('lastname').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('authors');
