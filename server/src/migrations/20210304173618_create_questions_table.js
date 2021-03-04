exports.up = function (knex) {
  return knex.schema.createTable('questions', (table) => {
    table.increments('id');
    table.string('question', 128);
    table.integer('user_id');
    table.integer('ad_id');
    table.foreign('user_id').references('users.id');
    table.foreign('ad_id').references('ads.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('questions');
};
