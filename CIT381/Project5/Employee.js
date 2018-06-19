//used code from pages CIT 381

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

// Get employee EMPLOYEE_ID gets it as a js value 
app.get('/employee/:EMPLOYEE_ID?', function (req, res) {
    console.log("Route /employee GET", req.params);
    var data = [];
    var sql = "SELECT E.EMPLOYEE_ID, E.EMPLOYEE_LNAME, E.EMPLOYEE_FNAME, E.EMPLOYEE_MINITIAL, R.REGION_DESCRIPTION FROM EMPLOYEE E JOIN REGION R ON E.REGION_ID = R.REGION_ID";
    if (req.params.EMPLOYEE_ID != undefined) {
        sql += " WHERE EMPLOYEE_ID = ?";
        data = [req.params.EMPLOYEE_ID];
        //sql += " WHERE ?";
        //data = req.params;
        console.log(data);
    } else {
        sql += " ORDER BY EMPLOYEE_LNAME";
    }
    console.log("SQL", sql);
    connection.query(sql, data,
        function (errQuery, rows) {
            if (errQuery) {
                console.log("test");
                console.log(errQuery);
                res.json({rows: [], err: errQuery});
            } else if (rows) {
                console.log("Rows returned", rows.length);
                res.json({rows: rows, err: ""});
            } else {
                console.log("No employee rows...\n");
                res.json({rows: [], err: ""});
            }
        }
    );
});


app.get('/region/:REGION_DESCRIPTION?', function (req, res) {
    //var select = document.querySelector("#selectRegion").value;
    //console.log(select);
    console.log("Route /region GET", req.params);
    var data = [];
    var sql = "SELECT E.EMPLOYEE_ID, E.EMPLOYEE_LNAME, E.EMPLOYEE_FNAME, E.EMPLOYEE_MINITIAL, R.REGION_DESCRIPTION FROM EMPLOYEE E JOIN REGION R ON E.REGION_ID = R.REGION_ID";
    //sql += " WHERE REGION_DESCRIPTION = 'NW'";
    //data = [req.params.REGION_DESCRIPTION];

    
    if (req.params.REGION_DESCRIPTION != undefined) {
        sql += " WHERE REGION_DESCRIPTION = ?";
        data = [req.params.REGION_DESCRIPTION];
        //sql += " WHERE ?";
        //data = req.params;
        console.log(data);
    } else {
        sql += " ORDER BY REGION_DESCRIPTION";
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

// Add employee
app.post('/employee', function (req, res) {
    console.log("Route /employee POST");
    var data = {EMPLOYEE_LNAME: req.body.lastname, EMPLOYEE_FNAME: req.body.firstname, EMPLOYEE_MINITIAL: req.body.middlename, REGION_ID: req.body.regions};
    connection.query("INSERT INTO EMPLOYEE SET ?", 
        data, 
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
app.delete('/employee/:EMPLOYEE_ID?', function (req, res) {
    console.log("Route /employee DELETE");
    var sql = "DELETE FROM EMPLOYEE WHERE EMPLOYEE_ID = ?";
    //  obj way: var sql = "DELETE FROM EMPLOYEE WHERE ?";
    if (req.params.EMPLOYEE_ID != undefined) {
        var data = [req.params.EMPLOYEE_ID];
        // obj way: var data = {EMPLOYEE_ID: req.params.EMPLOYEE_ID};
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
        var s = "Invalid or missing employee last name";
        console.log(s);
        res.json({status: "Error", err: s});
    }
});


// Update employee
app.put('/employee', function (req, res) {
    console.log("Route /employee PUT");
    
    var data = [{EMPLOYEE_LNAME: req.body.lastname, EMPLOYEE_FNAME: req.body.firstname, EMPLOYEE_MINITIAL: req.body.middlename, REGION_ID: req.body.regions}, {EMPLOYEE_ID: req.body.employeeid}];
    connection.query("UPDATE EMPLOYEE SET ? WHERE ?", 
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


app.get('/employee.css', function(req, res) {
    res.sendFile(__dirname + '/employee.css');
});

app.get('/Employee.html', function(req, res) {
    res.sendFile(__dirname + '/Employee.html');
});

app.get('/Employee-client.js', function(req, res) {
    res.sendFile(__dirname + '/Employee-client.js');
});

// Handle missing pages requested using GET HTTP verb
app.get('*', function(req, res) {
  res.status(404).send('Sorry that page does not exist');
});

// Add error handling in case the connection is closed?
app.listen(8080, function () {
  console.log('Color server app listening on port 8080!');
});



/* Part 6A - displays employee name and the skill
SELECT 
    E.EMPLOYEE_LNAME,
    E.EMPLOYEE_FNAME,
    E.EMPLOYEE_MINITIAL,
    S.SKILL_DESCRIPTION
FROM
    EMPLOYEE E
        JOIN
    EMPLOYEE_SKILL ES ON E.EMPLOYEE_ID = ES.EMPLOYEE_ID
        JOIN
    SKILL S ON ES.SKILL_ID = S.SKILL_ID
WHERE
    E.EMPLOYEE_ID = '271';
*/

/*Part 6A.2 - displays just the skill of the Employee
SELECT 
    S.SKILL_DESCRIPTION
FROM
    SKILL S
        JOIN
    EMPLOYEE_SKILL ES ON S.SKILL_ID = ES.SKILL_ID
WHERE
    EMPLOYEE_ID = '271'

*/

/* Part 6B
SELECT 
    S.SKILL_DESCRIPTION
FROM
    SKILL S
WHERE
    SKILL_ID NOT IN (SELECT 
            SKILL_ID
        FROM
            EMPLOYEE_SKILL ES
        WHERE
            ES.EMPLOYEE_ID = '271');
*/