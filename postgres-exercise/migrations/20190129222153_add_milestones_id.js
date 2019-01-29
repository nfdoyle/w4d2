
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
      table.increments('milestones_pkey');
      table.integer('famous_person_id').unsigned();
      table.foreign('famous_person_id').references('id').inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('milestones', function (table) {
      table.dropColumn('milestones_pkey');
      table.dropColumn('famous_person_id');
    })
  ])
};
