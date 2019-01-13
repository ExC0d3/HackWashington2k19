var currentLat = 47.6204914;
var currentLon = -122.3492315;
var map;
var hereMarker;
var service;
var infowindow;
var markers = [];

function wikiSummaryApi(text) {
  fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + text)
    .then(r => r.json())
    .then(r => r['extract'])
    .catch(e => console.error('wikiSummaryApi failed on ' + text));
}

function here() {
  return new google.maps.LatLng(currentLat, currentLon);
}

var watchID = navigator.geolocation.watchPosition(function (position) {
  console.log('current postion updated...', position.coords);
  currentLat = position.coords.latitude
  currentLon = position.coords.longitude;
  if (!map) {
    initMap(currentLat, currentLon);
  }
  getSurroundingLocations();
});

function getSurroundingLocations() {
  var request = {
    location: here(),
    radius: '50',
    // type: ['restaurant'],
    // rankBy: google.maps.places.RankBy.DISTANCE
  };

  console.log('searching...')
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function (results, status) {
    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log('nearby..')
      // createMarkers(results);
      for (var i = 0; i < Math.min(10, results.length); i++) {
        var place = results[i];
        console.log(place);
        createMarker(results[i]);
      }
    }
  });
};

function requestDirection(query) {
  // Places API
  // var request = {
  //   query: query,
  //   fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
  // };
  // service = new google.maps.places.PlacesService(map);
  // service.findPlaceFromQuery(request, callback);

  // Directions API
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));
  var request = {
    origin: here(),
    destination: query,
    travelMode: 'WALKING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}

function drawHere() {
  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  hereMarker = new google.maps.Marker({
    position: here(),
    map: map,
    icon: image
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: here(),
    zoom: 15
  });

  requestDirection('Pike Place');
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}

function createMarker(place) {
  console.log(place)
  var image = {
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };

  var marker = new google.maps.Marker({
    map: map,
    icon: image,
    title: place.name,
    position: place.geometry.location,
    // animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
}
function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    createMarker(place);
    // bounds.extend(place.geometry.location);
  }
  // map.fitBounds(bounds);
}