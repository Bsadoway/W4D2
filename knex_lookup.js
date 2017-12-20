const dateFormat = require('dateformat');
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const arg = process.argv[2];

knex.select().from("famous_people").where({ last_name: arg }).then(( results) => {
  results.forEach((result) => {
    printRecord(result);
  });
  knex.destroy();
}).catch((error) => {
  console.log(error);
});


function printRecord(result) {
  const formattedDate = dateFormat(result.birthdate, "fullDate");
  console.log("Searching ...");
  console.log(`Found 1 person(s) by the name:`);
  console.log(`${result.id}: ${result.first_name} ${result.last_name}, born ${formattedDate}`); //output: 1
}
