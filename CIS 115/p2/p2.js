
//global map variables
//creat a defined object with set properties to null
let map = {map: null, marker: null, latLong: null};
let marker;
//array with an object that can be called through the array
let visit = [
        {name: 'Kyoto, Japan', latitude:35.0060799, longitude:135.7434383},
        {name: 'Bangkok, Thailand', latitude:13.758126, longitude:100.5168883},
        {name: 'Shenzhen, China', latitude:22.534307, longitude:114.0554183}
    ]

window.onload = () => {
    //clock 
	setInterval(timeDate, 500);

    //button for geo location
	let buttonCurrent = document.querySelector('#currentLocation');
	buttonCurrent.addEventListener("click", getMyLocation);
    visitPlaces();

    //drop down using call back getMyPlace to call the coordinates
    let selectPlace = document.querySelector('#places');
    selectPlace.addEventListener("change", getMyPlace);

    //center button using callback function getCenter
    let center = document.querySelector("#center");
    center.addEventListener("click", getCenter);
}

//time function
timeDate = () => {
	let timeTag = document.querySelector("#date");
	timeTag.innerHTML = (new Date()).toLocaleString();
}

// Use browser built-in gelocation feature, if available
getMyLocation = () => {
    if (navigator.geolocation) {
        // Setup the callback method when the getCurrentPosition is ready with a result
        //navigator.gelocation.... is an called object/function that we pre-defined through google
        //this allows google to gain the location of the user through isp or other means
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        alert("No geolocation available");
    }
}

//function that calls the select element then goes through the array list to get coords
getMyPlace = () => {
    let select = document.querySelector("select");
    let city = visit[select.selectedIndex - 1];
    //create an seperate object that uses the position in the array defined
    let coordsPlace  = {latitude: city.latitude, longitude: city.longitude};
    //creates an position object which is similar how displayLocation works excepts uses the coords object and set it's property
    //to coordsPlace
    let position = {coords: coordsPlace};
    //similar to how getMyLocation, but uses coords that the array defined 
    displayLocation(position);
    //showMap(coords);
}

// Location callback function with position object parameter returned from getCurrentPosition function
displayLocation = (position) => {
    // Extract location properties from position object and display using ES6 template literal
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    //let altitude = position.coords.altitude;
    let div = document.getElementById("location");
    div.innerHTML = `You are at Latitude: ${latitude}, 
                     Longitude: ${longitude}`;
                     //Altitude: ${altitude}
    // Show map passing coordinate object
    showMap(position.coords);
}

// Function to display Google map and add a map marker
showMap = (coords) => {
    // Create a Google latitude/longitude object
    let googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    // Set a few map options
    let mapOptions = {
        zoom: 10, 
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
addMarker = (latlong) => {
    var markerOptions = {
        position: latlong,
        map: map
    };
    marker = new google.maps.Marker(markerOptions);
    // Note usng Google Marker event listener method for callback
    marker.addListener('click', function() {
        let select = document.querySelector('select');
        //uses select element then goes through the values and gets the name
        let cityName = visit[select.selectedIndex - 1].name;
        let cityLat = visit[select.selectedIndex - 1].latitude;
        let cityLong = visit[select.selectedIndex - 1].longitude;
        //popup window for google using content = string
        let infoWindow = new google.maps.InfoWindow({content: 'Name: ' + cityName + ' Latitude: ' + cityLat + ' Longitude: ' + cityLong });                  
        //alert("Marker clicked");
        infoWindow.open(map, marker);
    });
}

//function used to create an option for each individual value into the select
visitPlaces = () => {
    let placeDrop = document.querySelector('#places');

    for (let i = 0; i < visit.length; i++){
        let option = document.createElement("option");
        option.innerHTML = visit[i].name;
        placeDrop.appendChild(option);
    }
}

//pre-determined function through google
getCenter = () => {
    map.setCenter(marker.getPosition());  
}