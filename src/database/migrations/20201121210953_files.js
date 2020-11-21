exports.up = (knex) => knex.schema.createTable('files', (table) => {
  table.increments();
  table.string('filename', 255).notNullable();
  table.string('original', 255).notNullable();
  table.bigInteger('size').notNullable();
  table.string('mimetype', 255).notNullable();
  table.integer('created_by').unsigned().references('id').inTable('users')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL');
  table.string('model_name').notNullable();
  table.integer('model_id').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('files');
