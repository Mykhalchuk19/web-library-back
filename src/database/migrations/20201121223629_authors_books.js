exports.up = (knex) => knex.schema.createTable('authors_books', (table) => {
  table.increments();
  table.integer('book_id').unsigned().references('id').inTable('books')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL');
  table.integer('author_id').unsigned().references('id').inTable('authors')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL');
});

exports.down = (knex) => knex.schema.dropTable('authors_books');
