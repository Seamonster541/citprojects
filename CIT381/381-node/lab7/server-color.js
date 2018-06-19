// npm install express
// npm install body-parser

"use strict";

var mysql = require('mysql');
var dbInfo = require('./dbInfo.js');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Configure body parser for handling post operations
app.use(bodyParser.urlencoded({ extended: false }));	// parsing algorithm
app.use(bodyParser.json());								// Use json

// Create database connection
console.log('Creating connection...\n');
var connection = mysql.createConnection({
    host: dbInfo.dbHost,
    port: dbInfo.dbPort,
    user: dbInfo.dbUser,
    password: dbInfo.dbPassword,
    database: dbInfo.dbDatabase
});

connection.connect(function(err) {
	console.log('Connecting to database...\n');
// Handle any errors
	if (err) console.log(err); 
	console.log('Connected to database...\n');
});

app.get('/colors', function (req, res) {
	console.log("Route /colors GET");
	var sql = "SELECT * FROM COLOR";
	connection.query(sql, 
		function (errQuery, rows) { 
			if (errQuery) {
				console.log(errQuery);
				res.json({rows: [], err: errQuery});
			} else if (rows) {
				console.log("Color rows returned...\n");
				res.json({rows: rows, err: ""});
			} else {
				console.log("No color rows...\n");
				res.json({rows: [], err: ""});
			}
		}
	);
});

app.get('/color.css', function(req, res) {
	res.sendFile(__dirname + '/color.css');
});

app.get('/color.html', function(req, res) {
	res.sendFile(__dirname + '/color.html');
});

app.get('/color.js', function(req, res) {
	res.sendFile(__dirname + '/color.js');
});

app.get('*', function(req, res) {
	res.status(404).send('Sorry that page not exist');
});

app.listen(8080, function() {
	console.log('Example app listening on port 8080!');
});
