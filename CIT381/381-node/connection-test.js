"use strict";

var mysql = require('mysql');
var dbInfo = require('./dbInfo.js');

try {
    var connection = mysql.createConnection({
        host: dbInfo.dbHost,
        port: dbInfo.dbPort,
        user: dbInfo.dbUser,
        password: dbInfo.dbPassword,
        database: dbInfo.dbDatabase
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to database, closing connection in 5 seconds...');
        setTimeout(function() {
            connection.end();
            console.log("Database connection closed")
        }, 5000);

    });
} catch (err) {
    console.log(err);
}