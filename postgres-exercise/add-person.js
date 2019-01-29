//knex version

// Implement an add_person.js script that takes in the first name, last name and date of a
// famous person as three command line arguments and uses Knex to perform an insert.

const settings = require("./settings"); // settings.json
const value = process.argv.slice(2);

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    database : settings.database,
    password : settings.password
  }
});

console.log(value);
knex('famous_people').insert({first_name: `${value[0]}`, last_name: `${value[1]}`,  birthdate: `${value[2]}`})
.finally(function() {
         knex.destroy();
        });
// let rowNum = 1;
// knex.select()
//   .from('famous_people')
//   .where({ first_name: value })
//   .then(rows => 
    
//     rows.forEach(function(row) {
//             console.log(`- ${rowNum}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`)
//             rowNum++;
//             //console.log(row);
//           })
//     ).finally(function() {
//       knex.destroy();
//     });

