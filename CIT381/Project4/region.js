//code taken from color, CIT 381
"use strict";

var mysql = require('mysql');
var dbInfo = require('./dbInfo.js');
var express = require('express');
var bodyParser = require("body-parser");

var app = express();

// Add static route for non-Node.js pages
app.use(express.static('public'));

// Configure body parser for handling post operations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Since were depending on db connection, the connection could have been terminated, need to check and handle

// Create database connection
console.log('Creating connection...\n');
var connection = mysql.createConnection({
    host: dbInfo.dbHost,
    port: dbInfo.dbPort,
    user: dbInfo.dbUser,
    password: dbInfo.dbPassword,
    database: dbInfo.dbDatabase
});
// Connect to database
connection.connect(function(err) {
    console.log('Connecting to database...\n');

    // Handle any errors
    if (err) console.log(err);
    console.log('Connected to database...\n');
});

// Get colors
app.get('/regions/:REGION_ID?', function (req, res) {
    console.log("Route /regions GET", req.params);
    var data = [];
    var sql = "SELECT * FROM REGION";
    if (req.params.REGION_ID != undefined) {
        sql += " WHERE REGION_ID = ?";
        data = [req.params.REGION_ID];
        //sql += " WHERE ?";
        //data = req.params;
        console.log(data);
    } else {
        sql += " ORDER BY REGION_ID";
    }
    console.log("SQL", sql);
    connection.query(sql, data,
        function (errQuery, rows) {
            if (errQuery) {
                console.log(errQuery);
                res.json({rows: [], err: errQuery});
            } else if (rows) {
                console.log("Rows returned", rows.length);
                res.json({rows: rows, err: ""});
            } else {
                console.log("No region rows...\n");
                res.json({rows: [], err: ""});
            }
        }
    );
});

/* Update
app.post('/colors/update/:COLOR_ID?', function (req, res) {
    // update color set color_name = ?, color_hex = ? where color_id = ?
    // data = [req.params.COLOR_ID, req.body.color, req.body.hex];
});
*/

// Add color
app.post('/regions/add', function (req, res) {
    console.log("Route /regions POST");
    var data = {REGION_DESCRIPTION: req.body.description}; //COLOR_HEX: req.body.hex
    connection.query('INSERT INTO REGION SET ?', 
        data, //(REGION_DESCRIPTION) VALUES (?)
        function (errQuery, result) {
            if (errQuery) {
                console.log(errQuery);
                res.json({status: "Error", err: errQuery});
            } else {
                console.log("Insert ID: ", result.insertId);
                res.json({status: result.insertId, err: ""});
            }
        }
    );
});

// Delete color
app.delete('/regions/delete/:REGION_ID?', function (req, res) {
    console.log("Route /regions DELETE");
    var sql = "DELETE FROM REGION WHERE REGION_ID = ?";
    //  obj way: var sql = "DELETE FROM REGION WHERE ?";
    if (req.params.REGION_ID != undefined) {
        var data = [req.params.REGION_ID];
        // obj way: var data = {REGION_ID: req.params.COLOR_ID};
        connection.query(sql, 
            data, 
            function (errQuery, result) {
                if (errQuery) {
                    console.log(errQuery);
                    res.json({status: "Error", err: errQuery});
                } else {
                    console.log("Deleted");
                    res.json({status: "Deleted", err: ""});
                }
            }
        );
    } else {
        var s = "Invalid or missing region id";
        console.log(s);
        res.json({status: "Error", err: s});
    }
});

// Update color
app.put('/regions/put', function (req, res) {
    console.log("Route /regions PUT");
    
    var data = [{REGION_DESCRIPTION: req.body.description}, {REGION_ID: req.body.REGION_ID}];
    connection.query("UPDATE REGION SET ? WHERE ?", 
        data, 
        function (errQuery, result) {
            if (errQuery) {
                console.log(errQuery);
                res.json({status: "Error", err: errQuery});
            } else {
                console.log("Updated ID: ", result.insertId);
                res.json({status: result.insertId, err: ""});
            }
        }
    );
    
});


// Handle missing pages requested using GET HTTP verb
app.get('*', function(req, res) {
  res.status(404).send('Sorry that page does not exist');
});

// Add error handling in case the connection is closed?
app.listen(8080, function () {
  console.log('Color server app listening on port 8080!');
});
