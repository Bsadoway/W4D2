const dateFormat = require('dateformat');
const db = require('./db');

const arg = process.argv[2];


function searchUsersByName(name) {
  db.connect((error, client) => {
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [name], (err, result) => {
      printRecord(result);
      client.end();
    });
  });
}

function printRecord(result) {
  const formattedDate = dateFormat(result.rows[0].birthdate, "fullDate");

  console.log("Searching ...");
  console.log(`Found ${result.rowCount} person(s) by the name ${arg}:`);
  console.log(`${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${formattedDate}`); //output: 1
}

searchUsersByName(arg);
