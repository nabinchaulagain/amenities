exports.up = function (knex) {
  return knex.schema.createTable('ads', (table) => {
    table.increments('id');
    table.string('title', 32).notNullable();
    table.text('description').notNullable();
    table.integer('price').notNullable();
    table.string('location', 128).notNullable();
    table.string('image', 128).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('views').defaultTo(0);
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('ads');
};
