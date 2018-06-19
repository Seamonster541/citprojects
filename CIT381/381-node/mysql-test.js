"use strict";

var mysql = require('mysql');
var dbInfo = require('./dbInfo.js');

var connection = null;
try {

    // When using callbacks, you must wait for the callback to be called
    // before attempting to execute the next "step" or the previous "step"
    // may not yet be finished
    // For web apps, we'll respond to http requests

    function displayColor(con, nextStep) {
        console.log("Retrieving COLOR table data...\n");
        con.query("SELECT * FROM COLOR", function (err, rows) {
            if (err) throw err;
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    var data = rows[i].COLOR_ID;
                    data += ", " + rows[i].COLOR_NAME
                    data += ", " + rows[i].COLOR_HEX
                    console.log(data);
                }
            }

            // Order: connect, delete, insert, update
            switch(nextStep) {
                case 1:
                    deleteBlack(con);
                    break;
                case 2:
                    insertBlack(con);
                    break;
                case 3:
                    updateBlack(con);
                    break;
            }
        });
    }

    // Delete any previously inserted Black color
    function deleteBlack(con) {
        console.log("Deleting any color BLACK rows...\n");
        connection.query("DELETE FROM COLOR WHERE COLOR_NAME = ?",
            ['Black'], 
            function (err, result) {
                if (err) throw err;
                console.log("Deleted " + result.affectedRows + " rows");
                displayColor(connection, 2);
            }
        );
    }

    // Insert Black color
    function insertBlack(con) {
        console.log("Inserting color BLACK row...\n");
        var color = {COLOR_NAME: "Black", COLOR_HEX: "#000001"};
        connection.query("INSERT INTO COLOR SET ?", 
            color, 
            function (err, result) {
                if (err) throw err;
                console.log("Color inserted, last insert ID = ", result.insertId);
                displayColor(connection, 3);
            }
        );
    }

    // Correct black hex value
    function updateBlack(con) {
        console.log("Updating color BLACK hex value...\n");
        connection.query("UPDATE COLOR SET COLOR_HEX = ? WHERE COLOR_NAME = ?",
            ['#000000', 'Black'], 
            function (err, result) {
                if (err) throw err;
                console.log("Color updated, rows changed = ", result.changedRows);
                displayColor(connection, 4);
            }
        );
    }

    // Create database connection
    connection = mysql.createConnection({
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
        if (err) throw err;
        console.log('Connected to database...\n');

        // Show COLOR table rows
        displayColor(connection, 1);

    });

} catch (err) {
    console.log(err);
    if (connection != null) {
        console.log("Disconnecting from database...");
        connection.end();
    }
}