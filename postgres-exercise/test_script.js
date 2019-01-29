const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }    
});

let value = 'Paul';
const query = `SELECT * FROM famous_people WHERE name like '${value}'`
client.query(query, test_db, (err, result) => {
  if (err) {
    return console.error("error running query", err);
  }
});


client.end();
//---------------------
const pg = require('pg');

const team = process.argv.slice(2)[0];

const client = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
};

const client = new pg.Client(client);

client.connect();

client.query("SELECT players.name, players.position FROM players LEFT JOIN teams ON players.team_id = teams.id WHERE teams.name=$1 AND teams.city=$2", [team, "Vancouver"], (err, res) => {
  if (err) {
    console.log("ERR:", err);
    return false;
  } 

  console.log(res.rows);

  client.end();
});
