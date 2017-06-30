const server = require('http').createServer();
const models = require('../db/models');
const Airport = require('../db//models/airport');
const Promise = require('bluebird');

// route requests through express app
server.on('request', require('../app'));

// in case we add more models, use Promise.all for scalability
Promise.all([
		// sync model
		Airport.sync({force: false})
	])
	.then(function () {
		// turn server on
		server.listen(3001, function () {
			console.log('Server is listening on port 3001');
		});
	})
	.catch(console.error);