// const Promise = require('bluebird');
const db = require('../db/models');
const Airport = db.model('airports');

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
  	Airport.findAll({})
  		.then(airports => {
		    res.json(airports);
  		});
  });