var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');

var path = require('path');
module.exports = app

.use(morgan('dev'))
.use(express.static(path.join(__dirname, './public')))
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json()) 

.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

// direct request URIs for '/api' to './api' directory for processing
.use('/api',require('./server/api'))

// Send index.html for anything else.
.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(err.message);
});