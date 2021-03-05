exports.up = function (knex) {
  return knex.schema.createTable('answers', (table) => {
    table.increments('id');
    table.string('answer', 128);
    table.integer('question_id');
    table.foreign('question_id').references('questions.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('answers');
};
