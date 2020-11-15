exports.up = (knex) => knex.schema.alterTable('categories', ((table) => {
  table.dropForeign('created_by');
  table.integer('created_by').unsigned().references('id').inTable('users')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL')
    .alter();
}));

exports.down = (knex) => knex.schema.alterTable('categories', ((table) => {
  table.dropColumn('created_by');
}));
