const settings = require("./settings"); // settings.json


const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

knex.insert({
    first_name: first_name,
    last_name: last_name,
    birthdate: birthdate
  })
  .into("famous_people").asCallback((error, results) => {
    knex.destroy();
  });
