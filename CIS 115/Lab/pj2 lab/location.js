// Use browser built-in gelocation feature, if available
function getMyLocation() {
	if (navigator.geolocation) {
	// Setup the callback method when the getCurrentPosition is ready with a result
	navigator.geolocation.getCurrentPosition(displayLocation);
	} 
	else {
		alert("Oops, no geolocation support");
	}
}
// Location callback function with position object parameter returned from getCurrentPosition function
function displayLocation(position) {
	// Extract location properties from position object and display using ES6 template literal
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let altitude = position.coords.altitude;
	let div = document.getElementById("location");
	div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}, Altitude: ${altitude}`;

	//another way to do this code
	//div.innerHTML = "You are at latitude:" + latitude + ', Longitude:' + longitude...

	showMap(position.coords);
}
// After DOM loaded, initiate process to retreive current location
window.onload = getMyLocation;

// Global map variable
let map;
// Function to display Google map
function showMap(coords) {

/*let ArrayLat = [45];
let ArrayLng = [100];
let googleLatAndLong = new google.mapsLatLng(ArrayLat[0], ArrayLng[100]);*/

// Create a Google latitude/longitude object
let googleLatAndLong = new google.maps.LatLng(35.0060799, 135.7434383); //(lat = 45, long = 100)
// Set a few map options
let mapOptions = {
zoom: 18,
center: googleLatAndLong,
mapTypeId: google.maps.MapTypeId.ROADMAP
};
// Get reference to display div
let mapDiv = document.getElementById("map");
// Create map, passing output div reference and map options object
map = new google.maps.Map(mapDiv, mapOptions);
// Add marker
addMarker(googleLatAndLong);
}
// Function to add marker to current map
function addMarker(latlong) {
	var markerOptions = {
	position: latlong,
	map: map
	};
	marker = new google.maps.Marker(markerOptions);
	marker.addListener('click', function() {
	let infoWindow = new google.maps.InfoWindow({content: "<b>This is test</b>"});
	alert("marker clicked");
	infoWindow.open(map, marker);
	});
}