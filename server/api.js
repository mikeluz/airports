const api = module.exports = require('express').Router();

api
  .use('/airports',require('./airports'))
	// Send 404 if no routes matched.
	.use((req, res) => res.status(404).end());