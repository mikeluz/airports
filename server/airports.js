// const Promise = require('bluebird');
const db = require('../db/models');
const Airport = db.model('airports');

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    res.json("OK");
  });