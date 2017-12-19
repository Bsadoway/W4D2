const pg = require("pg");
const settings = require("./settings"); // settings.json
var dateFormat = require('dateformat');


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const arg = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printRecord(result);
    client.end();
  });
});


function printRecord(result){
  const formattedDate = dateFormat(result.rows[0].birthdate, "fullDate");

  console.log("Searching ...");
  console.log(`Found ${result.rowCount} person(s) by the name ${arg}:`);
  console.log(`${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${formattedDate}`); //output: 1
}
