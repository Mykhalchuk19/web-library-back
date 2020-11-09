exports.up = (knex) => knex.schema.alterTable('categories', ((table) => {
  table.integer('created_by').unsigned().references('id').inTable('users')
    .alter();
}));

exports.down = (knex) => knex.schema.alterTable('categories', ((table) => {
  table.dropColumn('created_by');
}));
