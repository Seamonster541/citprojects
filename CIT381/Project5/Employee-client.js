
"use strict";
var baseURL = "http://localhost:8080";

function displayEmployee(data) {
    var tbl = "";

    // For each item in JSON, create div row with columns
    $.each(data.rows, function(index, row) {

    tbl += "<div class='row'>\n"
    //tbl += "<div class='employeeid'>" + row.EMPLOYEE_ID + "</div>\n";
    tbl += "<div class='col1'>" + row.EMPLOYEE_LNAME + "</div>\n";
    tbl += "<div class='col2'>" + row.EMPLOYEE_FNAME + "</div>\n";
    tbl += "<div class='col3'>" + row.EMPLOYEE_MINITIAL + "</div>\n";
    tbl += "<div class='col4'>" + row.REGION_DESCRIPTION + "</div>\n";    
    tbl += "<button id='" + row.EMPLOYEE_ID + "' onclick='updateEmployee(this)'>Edit</button>&nbsp;";
    tbl += "<button id='" + row.EMPLOYEE_ID + "' onclick='deleteEmployee(this)'>Delete</button>&nbsp;";
    tbl += "<button id='" + row.EMPLOYEE_ID + "' onclick='skillEmployee(this)'>Skill</button>&nbsp;";
    tbl += "</div>\n";
    //tbl += "</div>\n";
    //console.log(row.EMPLOYEE_ID)

});

    // Append tbl data to container div after first removing all rows but header
    $("#outputDiv").children("div:not(:first)").remove();
    $("#outputDiv").append(tbl);

    console.log(tbl);
}

function getEmployee() {
    console.log("Requesting employee...");
    $.ajax({
        url: baseURL + "/employee/",
        type: "GET",
        dataType: "json",
        success: function(data, status) {
            console.log("Employee received");
            displayEmployee(data);
        },
        error: function (xhr, status) {
            console.log("Error: ", status);
        }
    });
}

function filter() {
    var select = document.querySelector("#selectRegion").value
    console.log(select)
    var id = "";
    if (select == "NW"){
        id = select;
    }
    else if (select == "NE"){
        id = select;
    }
    else if (select == "SE"){
        id = select;
    }
    else if (select == "SW"){
        id = select;
    }
    else if (select == "MN"){
        id = select;
    }
    else if (select == "MS"){
         id = select;
    }
    else if (select == "All"){
        getEmployee();
    }
    
    $.ajax({
    url: baseURL + "/region/" + id,
    type: "GET",
    dataType: "json",
    success: function(data, status) {
        console.log("Region received");
        displayEmployee(data);
    },
    error: function (xhr, status) {
        console.log("Error: ", status);
    }
    });

    //for(var i = 0; i < select.length; i++){
    //   console.log(select[i]);\
    //}
}


function deleteEmployee(me) {
    console.log("Deleting employee...");
    var id = me.id;
    $.ajax({
        url: baseURL + "/employee/" + id,
        type: "DELETE",
        dataType: "json",
        data: {},
    success: function(data, status) {
        console.log("employee deleted");
        getEmployee();
    },
    error: function (xhr, status) {
        console.log("Error: ", status);
    }
    });
}

function addEmployee() {
    console.log("Adding employee...");
    var firstname = document.querySelector("#firstname").value;
    var middlename = document.querySelector("#middlename").value;
    var lastname = document.querySelector("#lastname").value;
    var regions = document.querySelector("#regions").value;
    $.ajax({
        url: baseURL + "/employee/",
        type: "POST",
        dataType: "json",
        data: {firstname: firstname, middlename: middlename, lastname: lastname, regions: regions},
    success: function(data, status) {
        console.log("Employee added");
        getEmployee();
    },
    error: function (xhr, status) {
        console.log("Error: ", status);
    }
    });
}


function updateEmployee(me) {
    console.log("Updating employee...");
    var id = me.id;
    var firstname = document.querySelector("#firstname").value;
    var middlename = document.querySelector("#middlename").value;
    var lastname = document.querySelector("#lastname").value;
    var regions = document.querySelector("#regions").value;
    $.ajax({
        url: baseURL + "/employee/",
        type: "PUT",
        dataType: "json",
        data: [{firstname: firstname, middlename: middlename, lastname: lastname, regions: regions, employeeid: id}],
    success: function(data, status) {
        console.log("Employee change");
        console.log(data);
        getEmployee();
    },
    error: function (xhr, status) {
        console.log("Error: ", status);
    }
    });
}

$(document).ready(function() {
    $("#outputDiv").append(getEmployee());
    $("#selectRegion").on('change', filter);
    $("#addEmployee").on('click', addEmployee);
});