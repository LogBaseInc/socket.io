function initMap() {
    var chicago = {lat: 41.85, lng: -87.65};
    var indianapolis = {lat: 39.79, lng: -86.14};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        scrollwheel: false,
        zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    // Set destination, origin and travel mode.
    var request = {
        destination: indianapolis,
        origin: chicago,
        travelMode: google.maps.TravelMode.DRIVING
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
}


function renderMap(origin, destination) {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: origin,
        scrollwheel: false,
        zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    // Set destination, origin and travel mode.
    var request = {
        destination: destination,
        origin: origin,
        travelMode: google.maps.TravelMode.DRIVING
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
}

function toJSON(msg) {
    if (!(msg instanceof Object)) {
        msg = JSON.parse(msg);
    }
    console.log(JSON.stringify(msg));
    return msg;
}

window.onload = function () {
    var socket = io();
    socket.on("connect", function () {
        console.log("connected");
    });
    socket.on("queue-1", function (msg) {
        msg = toJSON(msg);
        renderMap(msg["origin"], msg["destination"]);
    });
    socket.on("queue-2", function (msg) {
       msg = toJSON(msg);
	console.log(msg);
        $("#customer_stats")[0].innerText = "Customer ETA(mins): " + msg["customer_eta"];
        $("#ola_stats")[0].innerText = "OLA CAB ETA(mins): " + msg["ola_eta"];
    });
    socket.on("queue-3", function (msg) {
       msg = toJSON(msg);
        $("#booking_status")[0].innerText = "Status: " + msg["status"];
    });
}
