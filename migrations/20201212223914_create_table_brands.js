
exports.up = function(knex, Promise) {
    return knex.schema.createTable('brands', brands => {
        brands.increments('id').primary()
        brands.string('name').notNullable()
    })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('brands')
};
