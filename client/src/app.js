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
      mainMap.addDraggableMarker(mainMap.googleMap.getCenter())//coords entered ought to be center of map
    })
}

window.onload = app;