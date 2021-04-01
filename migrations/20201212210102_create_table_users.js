
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments('id').primary()
        users.string('name').notNullable()
        users.string('email').notNullable()
        users.string('password').notNullable()
        users.boolean('admin').notNullable().defaultTo(false)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
