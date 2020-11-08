exports.up = (knex) => knex.schema.createTable('categories', (table) => {
  table.increments();
  table.string('title', 255).unique().notNullable();
  table.string('short_description').nullable();
  table.text('description').nullable();
  table.integer('parent_id', 255).nullable();
  table.integer('created_by', 255).notNullable();
});

exports.down = (knex) => knex.schema.dropTable('categories');
