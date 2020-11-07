exports.up = (knex) => knex.schema.alterTable('users', ((table) => {
  table.integer('type').defaultTo(1);
}));

exports.down = (knex) => knex.schema.alterTable('users', ((table) => {
  table.dropColumn('type').defaultTo(1);
}));
