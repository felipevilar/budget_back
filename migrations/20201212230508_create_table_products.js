
exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', products => {
        products.increments('id').primary()
        products.string('name').notNullable()
        products.string('model').notNullable()
        products.string('desc', 1000)
        products.string('imageUrl', 1000)
        products.decimal('buyPrice').notNullable()
        products.decimal('taxes').notNullable().defaultTo(0)
        products.decimal('sellPrice').notNullable()
        products.integer('qtd').notNullable().defaultTo(0)

        products.integer('brandId').references('id').inTable('brands')
        products.integer('categoryId').references('id').inTable('categories')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
