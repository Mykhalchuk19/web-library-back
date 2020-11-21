exports.up = (knex) => knex.schema.alterTable('books', ((table) => {
  table.integer('file_id').unsigned().references('id').inTable('files')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL');
}));

exports.down = (knex) => knex.schema.alterTable('books', ((table) => {
  table.dropColumn('file_id');
}));
