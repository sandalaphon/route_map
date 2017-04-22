var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')

var app = function(){
  var center = {lat: 55.953251, lng: -3.188267}
  var containerDiv = document.querySelector("#main-map");
  var mainMap = new MapWrapper(containerDiv, center, 5);
  var startLatitude = localStorage.getItem("latitude"); //need better names for storage
  var startLongitude = localStorage.getItem("longitude"); //same here
  var start = {lat:+startLatitude, lng:+startLongitude}
  var end = {lat: 56, lng: -3.2}
  mainMap.addClickEvent();
  
  var directions = new Route(start, end, "BICYCLING")
  var route1 = directions.directions()
  mainMap.drawRoute(route1)
  var button = document.getElementById('waypoint')
  button.addEventListener('click', function(){
    var mapCenter = mainMap.googleMap.getCenter()
    // COMMENTED OUT ADD WAYPOINT (CAN BE INCLUDED INSTEAD OF addDraggableMarker)
      // directions.waypoints.push({
      //   location: mapCenter,
      //   stopover: true
      // })
      mainMap.addDraggableMarker(mapCenter)
      mainMap.drawRoute(directions.directions())
    })
}

window.onload = app;