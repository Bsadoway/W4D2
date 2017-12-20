// Update with your config settings.
const settings = require("./settings"); // settings.json

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: settings.database,
      user:     settings.username,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
