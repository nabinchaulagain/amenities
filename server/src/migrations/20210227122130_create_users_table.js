exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username', 64).notNullable();
    table.string('email', 64).notNullable();
    table.string('password', 128).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['username']);
    table.unique(['email']);
  });
};

exports.down = function (knex) {
  return knex.dropTable('users');
};
