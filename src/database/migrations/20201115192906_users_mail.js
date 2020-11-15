exports.up = (knex) => knex.schema.alterTable('users', ((table) => {
  table.integer('status').defaultTo(1);
  table.string('restore_password_code', 254).nullable();
  table.string('activation_code', 254).nullable();
}));

exports.down = (knex) => knex.schema.alterTable('users', ((table) => {
  table.dropColumn('status').defaultTo(1);
  table.dropColumn('activation_code');
  table.dropColumn('restore_password_code');
}));
