
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', categories => {
      categories.increments('id').primary()
      categories.string('name').notNullable()
      categories.integer('parentId').references('id').inTable('categories')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories')
};
