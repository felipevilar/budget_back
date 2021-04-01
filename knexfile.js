// Update with your config settings.
/* const db = {
  database: "sistema",
  user: "postgres",
  password: "root",
}; */

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
