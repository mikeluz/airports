// "npm run seed" in terminal to create db and seed it with all US airports from .csv

const Promise = require('bluebird');
const db = require('../db/models');
const Airport = require('../db/models/airport');

// 'us-airports-clean-no-small' -- no balloonports, heliports, closed ports, or small airports
// small airports was removed to ensure the db seeded completely without timeout. 
// I got it to seed once but it wasn't reliable.
const csvFilePath = __dirname + '/us-airports-clean-no-small.csv';
const csv = require('csvtojson');

const getAirportsFromCSV = () => {
  let airports = [];
  csv()
  .fromFile(csvFilePath)
  .on('json',(jsonObj)=>{
    console.log("row", jsonObj);
    airports.push(jsonObj);
  })
  .on('done',(error)=>{
    console.log('end')
  })
  console.log("airports", airports);
  return airports;
}

const airportSeed = new Promise((res, rej) => {
  var airportsFromCSV = getAirportsFromCSV();
  res(airportsFromCSV);
}).then((airportsFromCSV) => {
  return new Promise(resolve =>
    // 'child_process.exec' docs: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    require('child_process').exec('createdb airports', resolve)
  ).then(() => {
    db.sync({force: true})
    .then(function () {
      console.log("Dropped old data, now inserting data");
        return Promise.map(airportsFromCSV, function (row) {
          return Airport
          .create(row);
        });
    })
    .then(function () {
      console.log("Finished inserting data");
    })
    .catch(function (err) {
      console.error('There was totally a problem', err, err.stack);
    })
    .finally(function () {
      db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
      console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
      return null; // silences bluebird warning about using non-returned promises inside of handlers.
    });
  });
});

