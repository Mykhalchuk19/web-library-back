exports.up = (knex) => knex.schema.alterTable('users', ((table) => {
  table.integer('avatar').unsigned().references('id').inTable('files')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL');
}));

exports.down = (knex) => knex.schema.alterTable('users', ((table) => {
  table.dropColumn('avatar');
}));
