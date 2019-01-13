
// Science Center
var currentLat = 47.6193101;
var currentLon = -122.3534435;

// Half way to Space Needle
var lat1 = 47.6199454;
var lon1 = -122.3517859;

// Got to Space Needle
var lat2 = 47.6203000;
var lon2 = -122.3492315;

var map;
var hereMarker;
var service;
var directionsDisplay;
var markers = [];

var place;

const passed1 = 'you passed the PACCAR IMAX Theater, it is a two floor theater with big grey arched pillars and railings of the same shape on the outside.'
// const passed1 = 'you are near the Laser Dome at the Pacific Science Center, Pacific Science Center’s Laser Dome has a packed catalog of shows that feature stunning laser imagery and powerful sound.';
// const passed1 = 'you are near PACCAR IMAX Theater, it is a two floor theater with big grey arched pillars and railings of the same shape on the outside.';

function wikiSummaryApi(text) {
  fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + text)
    .then(r => r.json())
    .then(r => r['extract'])
    .catch(e => console.error('wikiSummaryApi failed on ' + text));
}

function here() {
  return new google.maps.LatLng(currentLat, currentLon);
}

function saySpeech(speech) {
  console.log('speak:', speech)
  return () => speak(speech);
}
// Get directions.
setTimeout(() => {
  place = decodeURI(window.location.search.split('=', 2)[1]).trim();
  var log = `navigating to ${place}`
  speak(log);
  console.log(log);
  if (place.includes('Space Needle')) {
    var log = `walk straight for 256 feet, then turn right.`
    speak(log);
    console.log(log);
    // getSurroundingLocations(saySpeech(nearbySpeech1));
    // Walk halfway.
    setTimeout(() => {
      currentLat = lat1;
      currentLon = lon1;
      drawHere();
      getSurroundingLocations(saySpeech(passed1));
    }, 8000);

    // Walk all the way.
    setTimeout(() => {
      currentLat = lat2;
      currentLon = lon2;
      drawHere();
      deleteMarkers();
      saySpeech(`you arrived at ${place}.`)();
    }, 18000);
  } else {
    getSurroundingLocations(() => {});
  }
  // requestDirection('Space Needle');
  requestDirection(place);
}, 1000);

// var watchID = navigator.geolocation.watchPosition(function (position) {
//   console.log('current postion updated...', position.coords);
//   currentLat = position.coords.latitude
//   currentLon = position.coords.longitude;
//   if (!map) {
//     initMap();
//   }
//   getSurroundingLocations();
//   requestDirection('Space Needle');
// });

function getSurroundingLocations(callback) {
  deleteMarkers();

  var request = {
    location: here(),
    // radius: '250',
    type: ['points_of_interest'],
    rankBy: google.maps.places.RankBy.DISTANCE
  };

  console.log('searching...')
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function (results, status) {
    console.log('nearbySearch:', results, status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < Math.min(10, results.length); i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
    callback();
  });
};

function requestDirection(query) {
  document.getElementById('destination-name').innerText = query
  deleteMarkers();
  // Places API
  // var request = {
  //   query: query,
  //   fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
  // };
  // service = new google.maps.places.PlacesService(map);
  // service.findPlaceFromQuery(request, callback);
  // Directions API
  var directionsService = new google.maps.DirectionsService();
  var request = {
    origin: here(),
    destination: query,
    travelMode: 'WALKING'
  };
  directionsService.route(request, function(response, status) {
    console.log('route', response);
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}

function drawHere() {
  if (!hereMarker) {
    var image = {
      url: 'http://maps.google.com/mapfiles/kml/shapes/man.png',
      scaledSize: new google.maps.Size(25, 25), // scaled size
    };
    hereMarker = new google.maps.Marker({
      position: here(),
      map: map,
      icon: image,
      zIndex: 10
    });
  }
  hereMarker.setPosition(here());
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: here(),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
  });

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  drawHere();
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}


function createMarkers(places) {
  // var bounds = new google.maps.LatLngBounds();
  for (var i = 0, place; place = places[i]; i++) {
    createMarker(place);
    // bounds.extend(place.geometry.location);
  }
  // map.fitBounds(bounds);
}

// Adds a marker to the map and push to the array.
function createMarker(place) {
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

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}