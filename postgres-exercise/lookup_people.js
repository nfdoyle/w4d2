const pg = require('pg');
const settings = require("./settings"); // settings.json
const value = process.argv.slice(2)[0];

const config = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
};

const client = new pg.Client(config);

client.connect();

client.query(`SELECT * FROM famous_people WHERE first_name like $1`, [value], (err, res) => {
  if (err) {
    console.log("ERR:", err);
    return false;
  } else {
    console.log("Searching...");
  }

  console.log(res.rows);
  console.log('Response------------------------------------');
  if (res.rows.length) {
    console.log(`Found ${res.rowCount} person(s) by the name '${value}':`);
    let rowNum = 1;
    res.rows.forEach(function(row) {
      console.log(`- ${rowNum}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`)
    });
  } else {
    console.log("No results found");
  }
  
  
  console.log(res.rowCount);
  console.log(res);

  client.end();
});

// node lookup_people.js Paul
// Searching ...
// Found 2 person(s) by the name 'Paul':
// - 1: Paul Rudd, born '1969-04-06'
// - 2: Paul Giamatti, born '1967-06-06'