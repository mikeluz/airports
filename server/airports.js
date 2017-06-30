// const Promise = require('bluebird');
const db = require('../db/models');
const Airport = db.model('airports');

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
  	Airport.findAll({
  		// returning only large airports for now -- need to optimize to be performant for all airports
  		where: {
  			type: "large_airport"
  		}
  	})
  		.then(airports => {
		    res.json(airports);
  		});
  });