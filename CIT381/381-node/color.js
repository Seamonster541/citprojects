"use strict";
var baseURL = "http://localhost:8080";

function displayColors(data) { 
	var tbl = "";

	// For each item in JSON, create div row with columns 
	$.each(data.rows, function(index, row) {
		tbl += "<div class='row'>\n";
		tbl += "<div class='col1'>" + row.COLOR_ID + "</div>\n";
		tbl += "<div class='col2'>" + row.COLOR_NAME + "</div>\n"; 
		tbl += "<div class='col3'>" + row.COLOR_HEX + "</div>\n"; 
		tbl += "</div>\n";
	});
	// Append tbl data to container div after first removing all rows but header 
	$("#outputDiv").children("div:not(:first)").remove(); 
	$("#outputDiv").append(tbl);
}

function getColors() { 
	console.log("Requesting colors...");
	$.ajax({
		url: baseURL + "/colors/",
		type: "GET",
		dataType: "json",
		success: function(data, status) {
			console.log("Colors received");
			displayColors(data);
		},
		error: function (xhr, status) { 
			console.log("Error: ", status);
		}
	});
}

$(document).ready(function() {
	$("#outputDiv").append(getColors());
});























