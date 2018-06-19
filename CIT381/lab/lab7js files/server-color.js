"use strict";

var mysql = require('msql');
var dbInfo = require('./dbInfo.js');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//configure body parser
app.use(bodyParser.urlencoded({ extended: false})); //parsing algorithm
app.use(bodyParser.json());							//us json

 // Create database connection
connection = mysql.createConnection({
    host: dbInfo.dbHost,
    port: dbInfo.dbPort,
    user: dbInfo.dbUser,
    password: dbInfo.dbPassword
    database: dbInfo.dbDatabase
    });

// Connect to database
connection.connect(function(err) {
    console.log('Connecting to database...\n');

    // Handle any errors
    if (err) throw err;
    console.log('Connected to database...\n');

});


app.get("/", function(req, res) {
	res.send("Show me the page!");
})
