exports.up = (knex) => knex.schema.createTable('books', (table) => {
  table.increments();
  table.string('title').notNullable();
  table.string('short_description').nullable();
  table.string('city').nullable();
  table.integer('year').nullable();
  table.string('publishing_house').nullable();
  table.string('edition').nullable();
  table.string('series').nullable();
  table.integer('created_by').notNullable();
  table.integer('category_id').unsigned().references('id').inTable('categories')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL');
});

exports.down = (knex) => knex.schema.dropTable('books');
