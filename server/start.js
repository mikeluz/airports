var server = require('http').createServer();
var models = require('../db/models');
var Airport = require('../db//models/airport');
var Promise = require('bluebird');

server.on('request', require('../app'));

Promise.all([
		Airport.sync({})
	])
	.then(function () {
		server.listen(3001, function () {
			console.log('Server is listening on port 3001!');
		});
	})
	.catch(console.error);