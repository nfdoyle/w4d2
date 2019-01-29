//knex version
const settings = require("./settings"); // settings.json
const value = process.argv.slice(2)[0];

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    database : settings.database,
    password : settings.password
  }
});


let rowNum = 1;
knex.select()
  .from('famous_people')
  .where({ first_name: value })
  .then(rows => 
    
    rows.forEach(function(row) {
            console.log(`- ${rowNum}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`)
            rowNum++;
            //console.log(row);
          })
    ).finally(function() {
      knex.destroy();
    });

