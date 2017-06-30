var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');

var path = require('path');
module.exports = app;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// direct request URIs for '/api' to './api' directory for processing
app.use('/api',require('./server/api'));

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(err.message);
});