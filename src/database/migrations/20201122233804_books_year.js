exports.up = (knex) => knex.schema.alterTable('books', ((table) => {
  table.string('year').nullable().alter();
}));

exports.down = (knex) => knex.schema.alterTable('books', ((table) => {
  table.dropColumn('year');
}));
