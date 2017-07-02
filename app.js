var express = require('express');
var app = express();

// dev only
var morgan = require('morgan');

var path = require('path');
module.exports = app

.use(morgan('dev'))
.use(express.static(path.join(__dirname, './public')))

// direct request URIs for '/api' to './api' directory for processing
.use('/api',require('./server/api'))

// Send index.html for anything else
.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(err.message);
});