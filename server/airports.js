const Airport = require('../db/models/airport');

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
  	Airport.findAll({
  		// returning only large airports for now
  		where: {
  			type: "large_airport"
  		}
  	})
  		.then(airports => {
		    res.json(airports);
  		});
  });